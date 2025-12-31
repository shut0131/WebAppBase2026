import { describe, expect, it, vi } from "vitest"
import { capitalize, clamp, debounce, formatCurrency } from "./utils"

describe("formatCurrency", () => {
  it("formats USD currency correctly", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56")
  })

  it("formats with different locale and currency", () => {
    expect(formatCurrency(1234.56, "ja-JP", "JPY")).toBe("￥1,235")
  })

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0.00")
  })

  it("handles negative numbers", () => {
    expect(formatCurrency(-100)).toBe("-$100.00")
  })
})

describe("clamp", () => {
  it("returns the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it("returns min when value is below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it("returns max when value is above range", () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it("handles equal min and max", () => {
    expect(clamp(5, 5, 5)).toBe(5)
  })
})

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  it("lowercases rest of string", () => {
    expect(capitalize("HELLO")).toBe("Hello")
  })

  it("handles empty string", () => {
    expect(capitalize("")).toBe("")
  })

  it("handles single character", () => {
    expect(capitalize("a")).toBe("A")
  })
})

describe("debounce", () => {
  it("delays function execution", async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it("only calls function once for multiple rapid calls", async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})
