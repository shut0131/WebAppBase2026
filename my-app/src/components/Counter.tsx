"use client"

import { useState } from "react"

type CounterProps = {
  initialValue?: number
  step?: number
  onCountChange?: (count: number) => void
}

export function Counter({
  initialValue = 0,
  step = 1,
  onCountChange
}: CounterProps) {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    const newCount = count + step
    setCount(newCount)
    onCountChange?.(newCount)
  }

  const decrement = () => {
    const newCount = count - step
    setCount(newCount)
    onCountChange?.(newCount)
  }

  const reset = () => {
    setCount(initialValue)
    onCountChange?.(initialValue)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span data-testid="count-value" className="text-4xl font-bold">
        {count}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={decrement}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          -
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={increment}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  )
}
