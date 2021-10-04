/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NumberInput from "../../components/NumberInput"

describe("NumberInput", () => {
  let expectedProps

  beforeEach(() => {
    expectedProps = {
      name: "firstCurrencyValue",
      value: 1,
      onChange: () => {},
    }
  })

  test("should have initial value of 1", () => {
    render(<NumberInput {...expectedProps} />)
    const input = screen.getByDisplayValue(expectedProps.value)

    expect(parseInt(input.value)).toEqual(1)
  })

  test("should change to 100", () => {
    expectedProps.value = 100
    render(<NumberInput {...expectedProps} />)
    const input = screen.getByDisplayValue(expectedProps.value)

    expect(parseInt(input.value)).toEqual(100)
  })

  test("should change to 0 if entered negative number", async () => {
    expectedProps.value = -100
    render(<NumberInput {...expectedProps} />)

    await waitFor(() => {
      let element = document.getElementById(expectedProps.name)
      userEvent.click(element)
    })

    const input = await screen.findByDisplayValue(expectedProps.value)
    expect(parseInt(input.value)).toEqual(0)
  })
})
