import RefreshButton from "./RefreshButton"
import PostCard from "./PostCard"

const PostFeed = ({ feed }) => {
  return (
    <>
      <RefreshButton />

      {feed.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  )
}

export default PostFeed
