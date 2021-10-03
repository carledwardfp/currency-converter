import moment from "moment"

export const convert = (value, conversionRate) => {
  if (conversionRate) return (value * conversionRate).toFixed(2)
  return ""
}

export const getDate = (date) => {
  let formattedDate = moment(date).format("MM/DD/YY hh:mm A")
  return formattedDate
}
