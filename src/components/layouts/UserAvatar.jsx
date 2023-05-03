import { Typography, Avatar } from "@mui/material"
import randomString from "../../utils/randomString"

const UserAvatar = ({ user, size = "40px", fontSize = "26px" }) => {
  return (
    <Avatar src={user.avatar + "?dummy=" + randomString(5)} sx={{ height: size, width: size, objectFit: "cover" }}>
      <Typography fontFamily="Righteous" fontSize={fontSize}>
        {user.username[0].toUpperCase()}
      </Typography>
    </Avatar>
  )
}

export default UserAvatar
