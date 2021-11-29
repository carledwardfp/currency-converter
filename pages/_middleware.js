import { NextResponse } from "next/server"
import countriesData from "lib/countries.json"

export function middleware(req) {
  const { nextUrl: url, geo } = req
  const geoCountry = geo?.country || "PH"

  const country = countriesData.find(
    (countryData) => countryData.countryCode === geoCountry
  )

  url.searchParams.set("defaultCurrencyCode", country.currencyCode)
  return NextResponse.rewrite(url)
}
