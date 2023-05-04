import { Stack, Skeleton } from "@mui/material"
import { navHeight } from "../../../utils/constants"
import PostSkeleton from "./PostSkeleton"

const FeedSkeleton = ({ length = 6 }) => {
  return (
    <>
      <Stack flexDirection="row" justifyContent="end" position="sticky" top={navHeight} p="4px">
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>

      {Array(length)
        .fill(0)
        .map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
    </>
  )
}

export default FeedSkeleton
