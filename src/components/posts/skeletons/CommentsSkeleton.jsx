import { Stack, Skeleton, Typography } from "@mui/material"
import { navHeight } from "../../../utils/constants"

const CommentsSkeleton = ({ length = 3 }) => {
  return (
    <>
      <Stack flexDirection="row" justifyContent="end" position="sticky" top={navHeight} p="4px">
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>

      {Array(length)
        .fill(0)
        .map((_, idx) => (
          <Stack key={idx} gap="16px" p="18px" borderRadius="5px" bgcolor="#fff">
            <Stack flexDirection="row" alignItems="center" gap="8px">
              <Skeleton variant="circular" width={40} height={40} />

              <Skeleton variant="rectangular" width={140} height={25} />
            </Stack>

            <Typography px="13px">
              <Skeleton height={34} />
            </Typography>
          </Stack>
        ))}
    </>
  )
}

export default CommentsSkeleton
