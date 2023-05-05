import { Stack } from "@mui/material"
import { Player } from "@lottiefiles/react-lottie-player"

const Error404 = () => {
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center">
      <Player autoplay loop src="/assets/animations/error/404.json" style={{ height: "480px" }} />
    </Stack>
  )
}

export default Error404
