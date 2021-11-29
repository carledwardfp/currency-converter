import { Box, Flex, Link, useColorModeValue } from "@chakra-ui/react"
import { Fragment } from "react"
import moment from "moment"

import navlinks from "./utils/nav.json"
import Settings from "./Settings"

const Nav = () => {
  const yearNow = moment().year()

  const fill = useColorModeValue("gray.800", "gray.500")
  const color = useColorModeValue("gray.800", "gray.400")
  const backgroudColor = useColorModeValue(["white", "gray.50"], ["gray.900"])

  return (
    <Flex
      as="nav"
      position="relative"
      direction="column"
      justifyContent="center"
      alignItems="center"
      py={4}
      backgroundColor={backgroudColor}
      borderTopRadius={[20, 0]}
    >
      <Flex
        as="ul"
        listStyleType="none"
        alignItems="center"
        justifyContent="center"
        width={["80vw", "50vw"]}
        m="0 auto"
      >
        {navlinks.map((item, index) => (
          <Fragment key={item.key}>
            <Link href={"/" + item.key}>
              <Box as="li" fill="gray">
                <Box
                  as="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width={["24px", "30px"]}
                  height={["24px", "30px"]}
                  viewBox="0 0 30 30"
                  fill={fill}
                  transition="all 0.2s ease-out"
                  _hover={{ fill: item.color }}
                >
                  <path d={item.path} />
                </Box>
              </Box>
            </Link>
            {index < navlinks.length - 1 && (
              <Box
                backgroundColor="gray"
                h="1.5rem"
                width="1px"
                m={["0 1.5rem", "0 2rem"]}
                opacity={0.5}
                transformOrigin="top left"
                transform="skewX(-20deg)"
              />
            )}
          </Fragment>
        ))}
      </Flex>
      <Flex as="p" color={color} mt={2} alignItems="center">
        &#169; {yearNow} &bull; Carl Edward <Settings />
      </Flex>
    </Flex>
  )
}

export default Nav
