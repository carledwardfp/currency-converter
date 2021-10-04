import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

const MyNumberInput = ({ name, value, handleChange, initialRef }) => {
  return (
    <FormControl aria-label={name} id={name}>
      <NumberInput
        allowMouseWheel
        name={name}
        value={value}
        onChange={handleChange}
        min={0}
        // precision={2} // Automatically formats input on type
      >
        <NumberInputField
          maxLength={9} // Maximimum of 9 digits
          ref={initialRef || null} // Focus on render
          onFocus={(event) => event.target.select()} // Highlight all for better UX
          value={value}
          name={name}
          min={0}
        />
        <NumberInputStepper />
      </NumberInput>
    </FormControl>
  )
}

export default MyNumberInput
