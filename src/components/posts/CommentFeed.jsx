import { Stack, Typography } from "@mui/material"
import { userApi } from "../../store"
import UserAvatar from "../layouts/UserAvatar"
import RefreshPostButton from "./RefreshPostButton"
import { motion } from "framer-motion"

const CommentFeed = ({ comments, postId }) => {
  const {
    data: { data: user },
  } = userApi.useFetchProfileQuery()

  return (
    <>
      <RefreshPostButton postId={postId} />

      {comments.map((comment) => (
        <Stack
          key={comment.id}
          component={motion.div}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1, transition: { duration: 0.8 } }}
          gap="16px"
          p="18px"
          bgcolor="#fff"
          borderRadius="5px"
          border={comment.userId === user.id && "3.6px solid black"}
        >
          <Stack flexDirection="row" alignItems="center" gap="8px">
            <UserAvatar user={comment.user} />

            <Typography fontFamily="Righteous" fontSize="18px" fontWeight="bold" color="#000">
              {comment.user.username}
            </Typography>
          </Stack>

          <Typography px="13px" fontFamily="Alkatra" fontSize="18px" color="#000">
            {comment.content}
          </Typography>
        </Stack>
      ))}
    </>
  )
}

export default CommentFeed
