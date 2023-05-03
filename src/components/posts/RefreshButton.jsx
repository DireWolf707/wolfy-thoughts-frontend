import { Stack, IconButton } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import { navHeight } from "../../utils/constants"
import { postApi, dataSliceActions, useDispatch } from "../../store"
import requestHandler from "../../utils/requestHandler"

const RefreshButton = () => {
  const dispatch = useDispatch()
  const [fetchFeed, { isFetching }] = postApi.useLazyFetchFeedQuery()

  const refreshHandler = () => {
    dispatch(dataSliceActions.clearFeed())

    requestHandler(fetchFeed({}).unwrap(), "fetching posts", "posts fetched").then(({ data, cursor }) => {
      dispatch(dataSliceActions.initFeed({ data, cursor }))
    })
  }

  return (
    <Stack flexDirection="row" justifyContent="end" position="sticky" top={navHeight} p="4px">
      <IconButton disabled={isFetching} onClick={refreshHandler} sx={{ bgcolor: "#000", ":hover": { bgcolor: "grey" } }}>
        <RefreshIcon sx={{ fill: "#fff" }} />
      </IconButton>
    </Stack>
  )
}

export default RefreshButton
