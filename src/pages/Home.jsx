import socket from "../utils/socket"
import { Stack, Typography } from "@mui/material"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    socket.connect()

    return () => socket.disconnect()
  }, [])

  return (
    <Stack flexGrow={1}>
      <Typography>Home</Typography>
    </Stack>
  )
}

export default Home
