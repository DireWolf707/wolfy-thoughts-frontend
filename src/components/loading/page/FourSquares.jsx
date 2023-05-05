import { Player } from "@lottiefiles/react-lottie-player"
import { Stack } from "@mui/material"

const FourSquares = ({ height = "360px" }) => {
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center">
      <Player autoplay loop src="/assets/animations/loading/four-squares.json" style={{ height }} />
    </Stack>
  )
}

export default FourSquares
