import { useState } from "react"
import { Typography, Avatar } from "@mui/material"
import randomString from "../../utils/randomString"

const UserAvatar = ({ user, size = "40px", fontSize = "26px", cache = true }) => {
  const [src, setSrc] = useState(cache ? user.avatar : user.avatar + "?dummy=" + randomString(5))

  return (
    <Avatar src={src} sx={{ height: size, width: size, objectFit: "cover" }}>
      <Typography fontFamily="Righteous" fontSize={fontSize}>
        {user.username[0].toUpperCase()}
      </Typography>
    </Avatar>
  )
}

export default UserAvatar
