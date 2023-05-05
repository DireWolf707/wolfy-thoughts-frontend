import { Stack } from "@mui/material"
import { Player } from "@lottiefiles/react-lottie-player"

const Home = () => {
  return (
    <Stack flexGrow={1}>
      <Player autoplay loop src="/assets/animations/home.json" style={{ height: "480px" }} />
    </Stack>
  )
}

export default Home
