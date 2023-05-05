import { Stack, IconButton } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import { navHeight } from "../../utils/constants"
import { postApi, dataSliceActions, useDispatch, useSelector } from "../../store"
import requestHandler, { ERR_TOAST } from "../../utils/requestHandler"

const RefreshButton = () => {
  const dispatch = useDispatch()
  const { topRef } = useSelector((store) => store.data)
  const [fetchFeed, { isFetching }] = postApi.useLazyFetchFeedQuery()

  const refreshHandler = () => {
    dispatch(dataSliceActions.clearFeed())

    topRef.current.scrollIntoView({ behavior: "instant" })

    requestHandler(fetchFeed().unwrap(), "fetching posts", "posts fetched")
      .then(({ data }) => dispatch(dataSliceActions.initFeed({ data })))
      .catch(ERR_TOAST)
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
