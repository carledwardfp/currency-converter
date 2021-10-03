import { Select } from "@chakra-ui/react"

const SelectInput = ({ options, name, value, handleChange }) => {
  return (
    <Select onChange={handleChange} value={value} variant="filled" name={name}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export default SelectInput
