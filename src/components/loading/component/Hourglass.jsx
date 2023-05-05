import { Player } from "@lottiefiles/react-lottie-player"

const Hourglass = ({ height = "40px" }) => {
  return <Player autoplay loop src="/assets/animations/loading/hourglass.json" style={{ height }} />
}

export default Hourglass
