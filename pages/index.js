import { useRef, useEffect, useState } from "react"
import Head from "next/head"
import _ from "lodash"
import useSWR from "swr"
import {
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { UpDownIcon } from "@chakra-ui/icons"
import { convert, getDate } from "services/utils"

import { api } from "services/api"
import Footer from "components/Footer"
import MyNumberInput from "components/NumberInput"
import SelectInput from "components/SelectInput"
import Nav from "components/Nav"
import ApiInfo from "components/ApiInfo"

export async function getServerSideProps() {
  let response = await api().get(
    `/v6/${process.env.NEXT_PUBLIC_API_KEY}/latest/USD`
  )
  let currencies = _.keys(response.data.conversion_rates).sort()
  return {
    props: {
      currencies: currencies || [],
    },
  }
}

export default function Home({ currencies }) {
  const { colorMode } = useColorMode()
  const initialRef = useRef(null)

  const [firstCurrency, setFirstCurrency] = useState("USD")
  const [secondCurrency, setSecondCurrency] = useState("PHP")
  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1)
  const [secondCurrencyValue, setSecondCurrencyValue] = useState("")
  const { data: firstCurrencyData } = useSWR(
    `/v6/${process.env.NEXT_PUBLIC_API_KEY}/latest/${firstCurrency}`
  )
  const [conversionRates, setConversionRates] = useState(
    firstCurrencyData?.conversion_rates
  )

  useEffect(() => {
    setSecondCurrencyValue("")
    setConversionRates(firstCurrencyData?.conversion_rates)
    setSecondCurrencyValue(
      convert(
        firstCurrencyValue,
        firstCurrencyData?.conversion_rates?.[secondCurrency]
      )
    )
  }, [firstCurrencyData])

  useEffect(() => {
    initialRef.current.focus()
  }, [])

  const handleValueChange = (value, conversionRates) => {
    setFirstCurrencyValue(value)
    setSecondCurrencyValue(convert(value, conversionRates?.[secondCurrency]))
  }

  const handleCurrencyChange = (event, callback) => {
    let newCurrency = event.target.value
    callback(newCurrency)

    if (event.target.name === "secondCurrency") {
      setSecondCurrencyValue(
        convert(firstCurrencyValue, conversionRates[newCurrency])
      )
    }
  }

  const handleSwapCurrencies = () => {
    setFirstCurrency(secondCurrency)
    setSecondCurrency(firstCurrency)
  }

  return (
    <Box
      backgroundColor={
        colorMode === "dark" ? ["gray.900", "gray.800"] : ["white", "gray.50"]
      }
    >
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Currency converter using API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Flex
          direction="column"
          align="center"
          justify="center"
          h={["calc(100vh - 6.5rem)", "calc(100vh - 6.875rem)"]}
        >
          <Text
            as="h1"
            fontSize={["3xl", "4xl", "5xl"]}
            mb={[-3, 3]}
            zIndex={100}
          >
            Currency Converter
          </Text>
          <Stack
            backgroundColor={
              colorMode === "dark" ? ["gray.900", "gray.900"] : "white"
            }
            borderRadius={5}
            px={10}
            pt={[8, 12]}
            pb={4}
            spacing={3}
            shadow={[null, "md"]}
            width={["auto", "400px"]}
          >
            <Box>
              <MyNumberInput
                name="firstCurrencyValue"
                value={firstCurrencyValue}
                handleChange={(value) => {
                  handleValueChange(value, conversionRates)
                }}
                initialRef={initialRef}
              />
            </Box>
            <Box ml={1}>
              <SelectInput
                options={currencies}
                value={firstCurrency}
                name="firstCurrency"
                handleChange={(event) =>
                  handleCurrencyChange(event, setFirstCurrency)
                }
                isFullWidth
              />
            </Box>

            <Center>
              <IconButton
                variant="ghost"
                aria-label="Settings"
                icon={<UpDownIcon />}
                onClick={handleSwapCurrencies}
              />
            </Center>

            <Box ml={1}>
              <SelectInput
                options={currencies}
                value={secondCurrency}
                name="secondCurrency"
                handleChange={(event) =>
                  handleCurrencyChange(event, setSecondCurrency)
                }
              />
            </Box>
            <Box>
              <Stat
                mt={2}
                padding={[5, 0]}
                borderRadius={[5, 0]}
                borderWidth={[1, 0]}
                borderColor={useColorModeValue(
                  ["gray.200"],
                  ["whiteAlpha.50", "transparent"]
                )}
              >
                <Skeleton isLoaded={firstCurrencyData}>
                  <StatLabel mb={"2px"}>
                    {firstCurrencyValue} {firstCurrency} =
                  </StatLabel>
                </Skeleton>
                <Skeleton isLoaded={firstCurrencyData}>
                  <StatNumber fontSize="3xl" mb={"2px"}>
                    {secondCurrencyValue} {secondCurrency}
                  </StatNumber>
                </Skeleton>
                <Skeleton isLoaded={firstCurrencyData}>
                  <StatHelpText as="em">
                    Last updated on:{" "}
                    {getDate(firstCurrencyData?.time_last_update_utc)}{" "}
                    <Box
                      display={useBreakpointValue({
                        base: "none",
                        lg: "inherit",
                      })}
                    >
                      <ApiInfo />
                    </Box>
                  </StatHelpText>
                </Skeleton>
              </Stat>
            </Box>

            <Footer />
          </Stack>
        </Flex>
      </Box>

      <Nav />
    </Box>
  )
}
