import { render } from "@testing-library/react"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import "@testing-library/jest-dom"

const CharkraRenderer = ({ children }) => {
  return (
    <ChakraProvider>
      <ColorModeProvider value="dark">{children}</ColorModeProvider>
    </ChakraProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {
    wrapper: CharkraRenderer,
    ...options,
  })

export * from "@testing-library/react"
export { customRender as render }
