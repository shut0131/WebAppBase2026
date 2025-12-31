import { defineRouting } from "next-intl/routing"

export const locales = ["en", "ja", "ar"] as const
export type Locale = (typeof locales)[number]

export const rtlLocales: Locale[] = ["ar"]

export const routing = defineRouting({
  locales,
  defaultLocale: "en"
})
