import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import FourSquares from "../loaders/FourSquares"
import { userApi } from "../../store"
import Toast from "../layouts/Toast"
import toast from "react-hot-toast"

const authToastOptions = { id: "auth-check" }

const AuthCheck = ({ children }) => {
  const [isServerSleeping, setIsServerSleeping] = useState(false)
  const { isLoading, isError, isSuccess } = userApi.useFetchProfileQuery()

  useEffect(() => {
    if (isSuccess && isServerSleeping) toast.success(Toast("Server is awake"), authToastOptions)
    else if (isError) toast.error(Toast("Server is sleeping, please try again later..."), authToastOptions)
    else if (isLoading) {
      const timeout = setTimeout(() => {
        setIsServerSleeping(true)
        toast.loading(Toast("Waking up server, it usually takes 30s"), authToastOptions)
      }, 1700)
      return () => clearTimeout(timeout)
    }
  }, [isLoading, isSuccess, isError])

  if (isLoading || isError)
    return (
      <Stack height="100vh" width="100vw">
        <FourSquares />
      </Stack>
    )

  return children
}

export default AuthCheck
