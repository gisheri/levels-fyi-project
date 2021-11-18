import { useQuery } from "react-query"

type CountriesRes = [
  { name: { common: string } },
]

export type Country = {
  name: string,
}

/**
 * If hitting an api with CORS access
 */
export const useQueryCountriesDirect = () => useQuery(
  'countries', 
  () => 
    fetch('https://restcountries.com/v3.1/all')
    .then<CountriesRes>( res => res.json() ?? [] )
    .then( countries => countries.map<Country>( country => ({ name: country.name.common }) )),
)

/**
 * Hitting our own api as a proxy
 */
export const useQueryCountries = () => useQuery(
  'countries', 
  () => 
    fetch('/api/countries')
    .then<Country[]>( res => res.json() ?? [] )
)
