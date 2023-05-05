import { useRef, useEffect } from "react"
import { Stack, Box, Button, Typography, IconButton, useMediaQuery } from "@mui/material"
import { navHeight, navLinks } from "../../utils/constants"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import GoogleIcon from "@mui/icons-material/Google"
import { useDispatch, userApi, dataSliceActions } from "../../store"
import requestHandler from "../../utils/requestHandler"

const Navbar = () => {
  const topRef = useRef(null)
  const dispatch = useDispatch()
  const isSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"))
  const [logout, { isLoading }] = userApi.useLogoutMutation()
  const {
    data: { data: user = null },
  } = userApi.useFetchProfileQuery()

  useEffect(() => {
    dispatch(dataSliceActions.setTopRef(topRef))
  }, [])

  const logoutHandler = () => requestHandler(logout().unwrap(), "logging out", "logged out")

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "fixed",
          zIndex: 1,
          height: navHeight,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(3px)",
          px: {
            xs: "12px",
            sm: "24px",
          },
        }}
      >
        <Link to="/">
          <Box component="img" src="/assets/logo.svg" height="24px" />
        </Link>

        {user &&
          (isSmall ? (
            <IconButton onClick={() => dispatch(dataSliceActions.toggleSidebar(true))}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack flexDirection="row" gap={2}>
              {navLinks.map((link, idx) => (
                <Stack key={idx} flexDirection="row" alignItems="center" gap={0.3}>
                  <link.Icon />
                  <Link to={link.href}>
                    <Typography fontFamily="Righteous" fontSize="14px">
                      {link.title}
                    </Typography>
                  </Link>
                </Stack>
              ))}

              <Button variant="contained" color="error" onClick={logoutHandler} disabled={isLoading}>
                logout
              </Button>
            </Stack>
          ))}

        {!user && (
          <Button
            startIcon={<GoogleIcon />}
            variant="contained"
            color="primary"
            href={`${import.meta.env.VITE_SERVER_URL}/user/login/google`}
          >
            login
          </Button>
        )}
      </Stack>

      <Box ref={topRef} flexShrink={0} height={navHeight} />
    </>
  )
}

export default Navbar
