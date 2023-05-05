import { useState, useRef } from "react"
import FourSquares from "../components/loading/page/FourSquares"
import UserAvatar from "../components/layouts/UserAvatar"
import { Stack, TextField, Button, IconButton } from "@mui/material"
import { userApi } from "../store"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import DeleteIcon from "@mui/icons-material/Delete"
import requestHandler from "../utils/requestHandler"

const Profile = () => {
  const {
    data: { data: user },
    isFetching,
  } = userApi.useFetchProfileQuery()
  const [updateProfile, { isLoading: isProfileUpdating }] = userApi.useUpdateProfileMutation()
  const [updateAvatar, { isLoading: isAvatarUpdating }] = userApi.useUpdateAvatarMutation()
  const [deleteAvatar, { isLoading: isAvatarDeleting }] = userApi.useDeleteAvatarMutation()

  const fileRef = useRef(null)
  const nameRef = useRef(null)
  const usernameRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    requestHandler(
      updateProfile({ name: nameRef.current.value, username: usernameRef.current.value }).unwrap(),
      "updating profile",
      "profile updated",
      setFormErrors
    )
  }

  const handleUpdateAvatar = (e) => {
    const avatarData = new FormData()
    avatarData.append("file", e.target.files[0])
    requestHandler(updateAvatar(avatarData).unwrap(), "updating avatar", "avatar updated", setFormErrors)
  }

  const handleDeleteAvatar = () => requestHandler(deleteAvatar().unwrap(), "deleting avatar", "avatar deleted", setFormErrors)

  if (isFetching) return <FourSquares />

  return (
    <Stack
      component="form"
      alignItems="center"
      onSubmit={handleSubmit}
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white", width: "320px" }}
    >
      <Stack flexDirection="row" alignItems="end" sx={{ mt: "-106px", mb: "12px" }}>
        <IconButton
          onClick={handleDeleteAvatar}
          disabled={isProfileUpdating || isAvatarUpdating || isAvatarDeleting}
          sx={{ mb: "34px", visibility: !user.avatar && "hidden" }}
        >
          <DeleteIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>

        <UserAvatar user={user} size="180px" fontSize="70px" cache={false} />

        <IconButton onClick={() => fileRef.current.click()} sx={{ mb: "34px" }}>
          <input
            ref={fileRef}
            onChange={handleUpdateAvatar}
            disabled={isProfileUpdating || isAvatarUpdating || isAvatarDeleting}
            type="file"
            hidden
          />
          <AddAPhotoIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        size="small"
        color="error"
        fullWidth
        type="email"
        defaultValue={user.email}
        disabled={true}
      />

      {[
        { label: "Name", errField: "name", ref: nameRef, type: "text", required: true, initialValue: user.name },
        { label: "Username", errField: "username", ref: usernameRef, type: "text", required: true, initialValue: user.username },
      ].map(({ label, errField, ref, type, required, initialValue }, idx) => (
        <TextField
          key={idx}
          inputProps={{ ref }}
          label={label}
          variant="outlined"
          size="small"
          color="error"
          fullWidth
          required={required}
          type={type}
          error={Boolean(formErrors[errField])}
          helperText={formErrors[errField]}
          defaultValue={initialValue}
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        color="error"
        fullWidth
        disabled={isProfileUpdating || isAvatarUpdating || isAvatarDeleting}
      >
        Update Details
      </Button>
    </Stack>
  )
}

export default Profile
