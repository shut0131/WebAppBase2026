import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Counter } from "./Counter"

describe("Counter", () => {
  it("renders with default initial value of 0", () => {
    render(<Counter />)
    expect(screen.getByTestId("count-value")).toHaveTextContent("0")
  })

  it("renders with custom initial value", () => {
    render(<Counter initialValue={10} />)
    expect(screen.getByTestId("count-value")).toHaveTextContent("10")
  })

  it("increments count when + button is clicked", async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole("button", { name: "+" }))
    expect(screen.getByTestId("count-value")).toHaveTextContent("1")
  })

  it("decrements count when - button is clicked", async () => {
    const user = userEvent.setup()
    render(<Counter initialValue={5} />)

    await user.click(screen.getByRole("button", { name: "-" }))
    expect(screen.getByTestId("count-value")).toHaveTextContent("4")
  })

  it("resets count when Reset button is clicked", async () => {
    const user = userEvent.setup()
    render(<Counter initialValue={5} />)

    await user.click(screen.getByRole("button", { name: "+" }))
    await user.click(screen.getByRole("button", { name: "+" }))
    expect(screen.getByTestId("count-value")).toHaveTextContent("7")

    await user.click(screen.getByRole("button", { name: "Reset" }))
    expect(screen.getByTestId("count-value")).toHaveTextContent("5")
  })

  it("uses custom step value", async () => {
    const user = userEvent.setup()
    render(<Counter step={5} />)

    await user.click(screen.getByRole("button", { name: "+" }))
    expect(screen.getByTestId("count-value")).toHaveTextContent("5")

    await user.click(screen.getByRole("button", { name: "-" }))
    expect(screen.getByTestId("count-value")).toHaveTextContent("0")
  })

  it("calls onCountChange callback when count changes", async () => {
    const user = userEvent.setup()
    const onCountChange = vi.fn()
    render(<Counter onCountChange={onCountChange} />)

    await user.click(screen.getByRole("button", { name: "+" }))
    expect(onCountChange).toHaveBeenCalledWith(1)

    await user.click(screen.getByRole("button", { name: "-" }))
    expect(onCountChange).toHaveBeenCalledWith(0)

    await user.click(screen.getByRole("button", { name: "Reset" }))
    expect(onCountChange).toHaveBeenCalledWith(0)
  })

  it("renders all buttons", () => {
    render(<Counter />)

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument()
  })
})
