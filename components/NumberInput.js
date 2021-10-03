import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

const MyNumberInput = ({
  name,
  value,
  handleChange,
  isDisabled,
  initialRef,
}) => {
  return (
    <FormControl id={name}>
      <NumberInput
        allowMouseWheel
        name={name}
        value={value}
        onChange={handleChange}
        min={0}
        isDisabled={isDisabled}
        // precision={2} // Automatically formats input on type
      >
        <NumberInputField
          maxLength={9} // Maximimum of 9 digits
          ref={initialRef || null} // Focus on render
          onFocus={(event) => event.target.select()} // Highlight all for better UX
        />
        <NumberInputStepper />
      </NumberInput>
    </FormControl>
  )
}

export default MyNumberInput
