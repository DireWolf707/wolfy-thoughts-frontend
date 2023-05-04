import { Stack, Skeleton, Typography } from "@mui/material"

const PostSkeleton = () => {
  return (
    <Stack gap="16px" p="18px" borderRadius="5px" bgcolor="#fff">
      <Stack flexDirection="row" alignItems="center" gap="8px">
        <Skeleton variant="circular" width={40} height={40} />

        <Skeleton variant="rectangular" width={140} height={25} />
      </Stack>

      <Typography px="13px">
        <Skeleton height={34} />
      </Typography>

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" p="2px 20px 2px 4px" borderRadius="80px">
        <Skeleton variant="circular" width={28} height={28} />

        <Stack flexDirection="row" alignItems="center" gap="18px">
          <Skeleton width={50} height={28} />

          <Skeleton width={70} height={28} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PostSkeleton
