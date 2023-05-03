import { Stack } from "@mui/material"
import PostInput from "../components/posts/PostInput"
import PostFeed from "../components/posts/PostFeed"

import randomString from "../utils/randomString"

const feed = [
  { id: randomString(), title: "heheh", content: "heheh", createdAt: Date.now(), user: { avatar: "link", username: "popin" } },
  { id: randomString(), title: "heheh", content: "heheh", createdAt: Date.now(), user: { avatar: "link", username: "popin" } },
  { id: randomString(), title: "heheh", content: "heheh", createdAt: Date.now(), user: { avatar: "link", username: "popin" } },
  { id: randomString(), title: "heheh", content: "heheh", createdAt: Date.now(), user: { avatar: "link", username: "popin" } },
  { id: randomString(), title: "heheh", content: "heheh", createdAt: Date.now(), user: { avatar: "link", username: "popin" } },
  { id: randomString(), title: "heheh", content: "heheh", createdAt: Date.now(), user: { avatar: "link", username: "popin" } },
]

const Feed = () => {
  return (
    <Stack gap="12px" m="26px auto" sx={{ width: { xs: "350px", sm: "420px", md: "460px" } }}>
      <PostInput />
      <PostFeed feed={feed} />
    </Stack>
  )
}

export default Feed
