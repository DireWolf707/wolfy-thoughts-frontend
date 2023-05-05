import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import FourSquares from "../loading/page/FourSquares"
import socket from "../../utils/socket"

const SocketProvider = () => {
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  useEffect(() => {
    const setSocketConnected = () => setIsSocketConnected(true)
    socket.on("connect", setSocketConnected)
    socket.connect()

    return () => socket.off("connect", setSocketConnected).disconnect()
  }, [])

  if (!isSocketConnected) return <FourSquares />
  return <Outlet />
}

export default SocketProvider
