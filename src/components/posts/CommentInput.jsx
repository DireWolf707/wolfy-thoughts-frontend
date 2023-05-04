import { Stack, Typography, Button, Box } from "@mui/material"
import { useState } from "react"
import { userApi, postApi, useDispatch, dataSliceActions } from "../../store"
import requestHandler from "../../utils/requestHandler"

const CommentInput = ({ postId }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState("")
  const exceedLimit = content.length > 200
  const [error, setError] = useState({})
  const [createComment, { isLoading }] = postApi.useCreateCommentMutation()
  const {
    data: { data: user },
  } = userApi.useFetchProfileQuery()

  const createPostHandler = () =>
    requestHandler(createComment({ data: { content }, postId }).unwrap(), "creating comment", "comment created", setError).then(
      ({ data }) => {
        setContent("")
        const comment = { ...data, user }
        dispatch(dataSliceActions.addComment(comment))
      }
    )

  return (
    <Stack p="26px 18px 6px 18px" bgcolor="#fff" borderRadius="5px">
      <Box
        value={content}
        onChange={(e) => setContent(e.target.value)}
        component="textarea"
        placeholder="Type comment here..."
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

      <Typography fontSize="13px" color="red" px="6px">
        {error.content}
      </Typography>

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" p="12px 18px">
        <Typography fontWeight="bold" color={exceedLimit ? "red" : "black"}>
          {content.length}/200
        </Typography>

        <Button onClick={createPostHandler} variant="contained" size="small" disabled={exceedLimit || isLoading}>
          Create Comment
        </Button>
      </Stack>
    </Stack>
  )
}

export default CommentInput
