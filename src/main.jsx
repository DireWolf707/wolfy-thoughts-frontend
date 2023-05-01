import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import AuthCheck from "./components/wrappers/AuthCheck"
import { ThemeProvider } from "@mui/material"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { store } from "./store"
import { theme } from "./utils/theme.js"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Toaster />

      <AuthCheck>
        <Router>
          <App />
        </Router>
      </AuthCheck>
    </ThemeProvider>
  </StoreProvider>
)
