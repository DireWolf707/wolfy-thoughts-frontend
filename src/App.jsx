import Navbar from "./components/layouts/Navbar"
import Sidebar from "./components/layouts/Sidebar"
import LoggedInRoute from "./components/wrappers/LoggedInRoute"
import SocketProvider from "./components/wrappers/SocketProvider"
import { Stack } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import { Home, Profile, Feed, Post, Error404, Error500 } from "./pages"
import { userApi } from "./store"

const App = () => {
  const { data: profile } = userApi.useFetchProfileQuery()
  const user = profile.data

  return (
    <Stack height="100vh" width="100vw" overflow="auto" bgcolor="#023020">
      <Navbar />
      {user && <Sidebar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* LoggedIn Routes */}
        <Route element={<LoggedInRoute />}>
          {/* Socket Enabled Routes */}
          <Route element={<SocketProvider />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/post/:postId" element={<Post />} />
          </Route>
          {/* Socket Disabled Routes */}
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Server Error (500) */}
        <Route path="/500" element={<Error500 />} />
        {/* Unknown Routes (404) */}
        <Route path="*" element={<Error404 />} />
        {/* End */}
      </Routes>
    </Stack>
  )
}

export default App
