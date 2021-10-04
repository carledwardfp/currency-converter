import { Select } from "@chakra-ui/react"

const SelectInput = ({ options, name, value, handleChange }) => {
  return (
    <Select
      onChange={handleChange}
      value={value}
      variant="filled"
      name={name}
      placeholder="Select First Currency"
    >
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export default SelectInput
