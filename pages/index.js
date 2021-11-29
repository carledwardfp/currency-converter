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

import Footer from "components/Footer"
import MyNumberInput from "components/NumberInput"
import SelectInput from "components/ReactSelect"
import Nav from "components/Nav"
import ApiInfo from "components/ApiInfo"

import { api } from "services/api"
import currencyData from "lib/currencies.json"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function getServerSideProps({ query }) {
  const response = await api().get(`/v6/${API_KEY}/latest/USD`)
  let currencies = _.keys(response.data.conversion_rates).sort()
  let currencyOptions = currencies.map((currency) => {
    let defaultCurrency = currencyData.find(
      (data) => data.AlphabeticCode === currency
    )
    return {
      label: `${currency}${
        defaultCurrency?.Currency ? ` (${defaultCurrency.Currency})` : ""
      }`, // format as ex. PHP (Philippine Peso)
      value: currency.toLowerCase(),
    }
  })
  return {
    props: {
      currencies: currencyOptions || [],
      defaultCurrencyCode: query.defaultCurrencyCode,
    },
  }
}

export default function Home({ currencies, defaultCurrencyCode }) {
  const { colorMode } = useColorMode()
  const initialRef = useRef(null)

  const [firstCurrency, setFirstCurrency] = useState({
    label: "USD (US Dollar)",
    value: "usd",
  })

  const defaultCurrency = currencyData.find(
    (data) => data.AlphabeticCode === defaultCurrencyCode
  )

  const [secondCurrency, setSecondCurrency] = useState({
    label: `${defaultCurrencyCode}${
      defaultCurrency?.Currency ? ` (${defaultCurrency.Currency})` : ""
    }`,
    value: defaultCurrencyCode.toLowerCase(),
  })

  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1)
  const [secondCurrencyValue, setSecondCurrencyValue] = useState("")

  const { data: firstCurrencyData } = useSWR(
    `/v6/${API_KEY}latest/${firstCurrency.value.toUpperCase()}`
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
        firstCurrencyData?.conversion_rates?.[
          secondCurrency.value.toUpperCase()
        ]
      )
    )
  }, [firstCurrencyData])

  useEffect(() => {
    initialRef.current.focus()
  }, [])

  const handleValueChange = (value, conversionRates) => {
    setFirstCurrencyValue(value)
    setSecondCurrencyValue(
      convert(value, conversionRates?.[secondCurrency.value.toUpperCase()])
    )
  }

  const handleCurrencyChange = ({ event, action }, callback) => {
    callback(event)

    if (action.name === "secondCurrency") {
      setSecondCurrencyValue(
        convert(firstCurrencyValue, conversionRates[event.value.toUpperCase()])
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
        colorMode === "dark" ? ["gray.800", "gray.900"] : ["white", "gray.50"]
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
            backgroundColor={colorMode === "dark" ? "gray.800" : "white"}
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
                handleChange={(event, action) =>
                  handleCurrencyChange({ event, action }, setFirstCurrency)
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
                handleChange={(event, action) =>
                  handleCurrencyChange({ event, action }, setSecondCurrency)
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
                    {firstCurrencyValue} {firstCurrency.label} =
                  </StatLabel>
                </Skeleton>
                <Skeleton isLoaded={firstCurrencyData}>
                  <StatNumber fontSize="3xl" mb={"2px"}>
                    {secondCurrencyValue} {secondCurrency.label}{" "}
                    <span
                      className={`currency-flag currency-flag-${secondCurrency.value}`}
                    />
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
