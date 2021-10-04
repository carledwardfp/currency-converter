/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import SelectInput from "../../components/SelectInput"

describe("SelectInput", () => {
  let expectedProps

  beforeEach(() => {
    expectedProps = {
      name: "firstCurrency",
      value: "USD",
      options: [],
      handleChange: () => {},
    }
  })

  test("should have placeholder text", () => {
    render(<SelectInput {...expectedProps} />)
    const select = screen.getByText(/Select First Currency/i)

    expect(select).toBeVisible()
  })

  test("should have USD option", () => {
    expectedProps.options = ["USD"]
    render(<SelectInput {...expectedProps} />)
    const select = screen.getByText(/USD/i)

    expect(select).toBeVisible()
  })

  test("should have PHP option", () => {
    expectedProps.options = ["USD", "PHP"]
    render(<SelectInput {...expectedProps} />)
    const select = screen.getByText(/PHP/i)

    expect(select).toBeVisible()
  })
})
