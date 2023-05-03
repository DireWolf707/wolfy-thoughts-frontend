import { io } from "socket.io-client"
import { toast } from "react-hot-toast"
import Toast from "../components/layouts/Toast"

const socket = io(import.meta.env.VITE_SERVER_URL, {
  autoConnect: false,
  withCredentials: true,
})

let once = true
socket.on("connect_error", (err) => {
  console.log({ ...err })
  if (once) {
    toast.error(Toast("something went wrong!"))
    once = false
  }
})
socket.on("connect", () => console.log("websocket connected"))
socket.on("disconnect", () => console.log("websocket disconnected"))

export default socket
