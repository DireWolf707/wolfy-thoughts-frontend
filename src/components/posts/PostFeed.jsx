import { Stack, Typography, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import UserAvatar from "../layouts/UserAvatar"
import RefreshIcon from "@mui/icons-material/Refresh"
import { navHeight } from "../../utils/constants"

const PostFeed = ({ feed }) => {
  return (
    <>
      <Stack flexDirection="row" justifyContent="end" position="sticky" top={navHeight} p="4px">
        <IconButton sx={{ bgcolor: "#000", ":hover": { bgcolor: "grey" } }}>
          <RefreshIcon sx={{ fill: "#fff" }} />
        </IconButton>
      </Stack>

      {feed.map((post) => (
        <Stack key={post.id} gap="16px" p="18px" bgcolor="#fff" borderRadius="5px">
          <Stack flexDirection="row" alignItems="center" gap="8px">
            <UserAvatar user={post.user} />

            <Typography fontFamily="Righteous" fontSize="18px" fontWeight="bold" color="#000">
              {post.user.username}
            </Typography>
          </Stack>

          <Typography fontFamily="Alkatra" fontSize="18px" color="#000">
            {post.content}
          </Typography>

          <Stack flexDirection="row" justifyContent="space-between">
            <Typography fontFamily="Righteous" fontSize="13px" fontWeight="bold" color="rgba(0,0,0,0.6)">
              {0} likes
            </Typography>

            <Link
              to={`/post/${post.id}`}
              style={{
                textDecoration: "underline",
                textDecorationColor: "rgba(0,0,0,0.6)",
                textDecorationThickness: "2px",
                textUnderlineOffset: "4px",
              }}
            >
              <Typography
                fontFamily="Righteous"
                fontSize="13px"
                fontWeight="bold"
                color="rgba(0,0,0,0.6)"
                sx={{ textUnderlineOffset: "2px" }}
              >
                {0} comments
              </Typography>
            </Link>
          </Stack>
        </Stack>
      ))}
    </>
  )
}

export default PostFeed
