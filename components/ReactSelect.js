import { components } from "react-select"
import { Select } from "chakra-react-select"
const { Option } = components

const OptionComponent = (props) => {
  return (
    <Option {...props}>
      <span className={`currency-flag currency-flag-${props.data.value}`} />{" "}
      {props.data.label}
    </Option>
  )
}

const SelectInput = ({ options, name, value, handleChange }) => {
  return (
    <Select
      onChange={handleChange}
      value={value}
      name={name}
      options={options}
      components={{ Option: OptionComponent }}
    />
  )
}

export default SelectInput
