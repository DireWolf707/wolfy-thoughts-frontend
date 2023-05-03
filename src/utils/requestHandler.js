import toast from "react-hot-toast"
import Toast from "../components/layouts/Toast"
import { capitalize } from "@mui/material"

const handleError400 = ({ message }, setFormErrors) => {
  if (message.indexOf(":") < 0) return message

  if (setFormErrors) {
    const formError = {}
    message.split(",").map((e) => {
      const [field, value] = e.split(":")
      formError[field] = capitalize(value)
    })
    setFormErrors(formError)
  }
  return "validation error"
}

export default (requestPromise, loadingMsg, successMsg, setFormErrors = null) => {
  return toast.promise(requestPromise, {
    loading: Toast(capitalize(loadingMsg) + "..."),
    success: () => {
      if (setFormErrors) setFormErrors({})
      return Toast(capitalize(successMsg) + "!")
    },
    error: (err) => {
      switch (err.status) {
        case 400:
          return Toast(capitalize(handleError400(err.data, setFormErrors)) + "!")

        case "FETCH_ERROR":
          return Toast("Server is unreachable at the moment!")

        default:
          console.log(err)
          return Toast("Something went wrong!")
      }
    },
  })
}

export const ERR_TOAST = () => toast.error(Toast("Something went wrong!"))
