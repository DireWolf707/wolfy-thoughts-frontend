import { io } from "socket.io-client"

const socket = io(import.meta.env.VITE_SERVER_URL, {
  autoConnect: false,
  withCredentials: true,
})

socket.on("connect", () => console.log("connected"))
socket.on("connect_error", console.log)
socket.on("disconnect", () => console.log("disconnected"))

export default socket
