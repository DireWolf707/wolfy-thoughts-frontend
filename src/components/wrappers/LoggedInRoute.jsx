import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { userApi } from "../../store"
import FourSquares from "../loaders/FourSquares"
import socket from "../../utils/socket"

const LoggedInRoute = ({ redirectPath = "/" }) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const {
    data: { data: user = null },
  } = userApi.useFetchProfileQuery()

  useEffect(() => {
    if (user) {
      const setSocketConnected = () => setIsSocketConnected(true)
      socket.on("connect", setSocketConnected)
      socket.connect()

      return () => socket.off("connect", setSocketConnected).disconnect()
    }
  }, [user])

  if (!user) return <Navigate to={redirectPath} replace />
  if (!isSocketConnected) return <FourSquares />
  return <Outlet />
}

export default LoggedInRoute
