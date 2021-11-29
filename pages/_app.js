import { useState } from "react"
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react"
import { SWRConfig } from "swr"
import { api } from "services/api"
import theme from "styles/theme"
import "currency-flags/dist/currency-flags.min.css"

function MyApp({ Component, pageProps }) {
  const toast = createStandaloneToast()
  const [errorCount, setErrorCount] = useState(1)

  const errorCallback = () => {
    setErrorCount((count) => count + 1)

    if (errorCount === 2) {
      return toast({
        id: "error",
        title: "Please reload the page",
        description:
          "Something went wrong. Please reload the page and try again.",
        status: "error",
        isClosable: true,
      })
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          dedupingInterval: 1000 * 60 * 60 * 24, // API limitation: Data refreshes only everyday. Change value when you upgrade plan
          fetcher: (url) =>
            api()
              .get(url)
              .then((response) => response.data),
          errorRetryCount: 2,
          onError: errorCallback,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp
