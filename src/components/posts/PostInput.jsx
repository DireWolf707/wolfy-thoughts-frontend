import { Stack, Typography, Button, Box } from "@mui/material"
import { useState } from "react"

const PostInput = () => {
  const [post, setPost] = useState("")
  const exceedLimit = post.length > 200

  return (
    <Stack p="26px 18px 6px 18px" bgcolor="#fff" borderRadius="5px">
      <Box
        value={post}
        onChange={(e) => setPost(e.target.value)}
        component="textarea"
        placeholder="Type something here..."
        height="120px"
        border="2px solid white"
        borderRadius="8px"
        bgcolor="#D5D5D5"
        color="#000"
        fontFamily="Alkatra"
        fontSize="18px"
        p="6px 12px"
        sx={{ resize: "none" }}
      />

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" p="12px 18px">
        <Typography fontWeight="bold" color={exceedLimit ? "red" : "black"}>
          {post.length}/200
        </Typography>

        <Button variant="contained" size="small" disabled={exceedLimit}>
          Create Post
        </Button>
      </Stack>
    </Stack>
  )
}

export default PostInput
