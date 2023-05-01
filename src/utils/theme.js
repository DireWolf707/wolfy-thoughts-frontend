import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

export const theme = createTheme({
  palette: {
    btn1: {
      main: "#fff",
      dark: red[50],
      contrastText: red[400],
    },
  },
})
