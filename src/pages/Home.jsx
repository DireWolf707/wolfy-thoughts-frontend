import { Stack } from "@mui/material"
import { Player } from "@lottiefiles/react-lottie-player"

const Home = () => {
  return (
    <Stack flexGrow={1}>
      <Player autoplay loop src="/assets/animations/think.json" style={{ height: "460px", width: "360px" }} />
    </Stack>
  )
}

export default Home
