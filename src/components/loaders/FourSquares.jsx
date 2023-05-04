import { Player } from "@lottiefiles/react-lottie-player"
import { Stack } from "@mui/material"

const FourSquares = () => {
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center" bgcolor="#000">
      <Player autoplay loop src="/assets/animations/four-squares.json" style={{ height: "300px", width: "300px" }} />
    </Stack>
  )
}

export default FourSquares
