import RefreshFeedButton from "./RefreshFeedButton"
import PostCard from "./PostCard"

const PostFeed = ({ feed }) => {
  return (
    <>
      <RefreshFeedButton />

      {feed.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  )
}

export default PostFeed
