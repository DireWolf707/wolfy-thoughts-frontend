import { Stack, IconButton } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import { navHeight } from "../../utils/constants"
import { postApi, dataSliceActions, useDispatch } from "../../store"
import requestHandler from "../../utils/requestHandler"

const RefreshPostButton = ({ postId }) => {
  const dispatch = useDispatch()
  const [fetchPost, { isFetching }] = postApi.useLazyFetchPostQuery()

  const refreshHandler = () => {
    dispatch(dataSliceActions.clearComments())

    requestHandler(fetchPost({ postId }).unwrap(), "fetching post", "post fetched").then(({ data }) =>
      dispatch(dataSliceActions.initComments({ data: data.comments }))
    )
  }

  return (
    <Stack flexDirection="row" justifyContent="end" position="sticky" top={navHeight} p="4px">
      <IconButton disabled={isFetching} onClick={refreshHandler} sx={{ bgcolor: "#000", ":hover": { bgcolor: "grey" } }}>
        <RefreshIcon sx={{ fill: "#fff" }} />
      </IconButton>
    </Stack>
  )
}

export default RefreshPostButton
