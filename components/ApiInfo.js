import {
  Box,
  List,
  ListIcon,
  ListItem,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"

const ApiInfo = () => {
  return (
    <Tooltip label={<Label />}>
      <InfoIcon />
    </Tooltip>
  )
}

const Label = () => {
  const display = useBreakpointValue({ base: "none", md: "inherit" })
  return (
    <Box>
      API limitations include:
      <List>
        <ListItem>
          <ListIcon as={InfoIcon} color="red.300" />
          The data updates only once a day
        </ListItem>
        <ListItem>
          <ListIcon as={InfoIcon} color="red.300" />
          The currency name is not returned, only the code (i.e. USD, PHP)
        </ListItem>
      </List>
    </Box>
  )
}

export default ApiInfo
