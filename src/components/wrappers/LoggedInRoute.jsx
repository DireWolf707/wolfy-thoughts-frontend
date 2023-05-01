import { Navigate, Outlet } from "react-router-dom"
import { userApi } from "../../store"

const LoggedInRoute = ({ redirectPath = "/" }) => {
  const {
    data: { data: user = null },
  } = userApi.useFetchProfileQuery()

  if (!user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default LoggedInRoute
