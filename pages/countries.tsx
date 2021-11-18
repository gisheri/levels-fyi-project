import { NextPage } from "next";
import { useMemo, useState } from "react";
import { Country, useQueryCountries } from "../queries/countries";
import styles from '../styles/Home.module.css'

type PreparedCountries = Record<string, Country[]>

//Creates an average of 10x the number of countries (from 250 to ~2000 substrings)
//Just subject matter for in case you want to talk about this stuff :)
const indexCountries = (countries: Country[]) => {
  const countriesHash: PreparedCountries = {}
  countries.forEach(country => {
    country.name.split('').forEach( (letter, i) => {
      const str = country.name.toLowerCase().substring(0, i + 1);
      countriesHash[str] = countriesHash[str]
        ? [...countriesHash[str], country]
        : [country]
    })
  })
  return countriesHash;
}

//about 100x faster than a .filter with .startsWith or a .includes
const searchCountries = (countries: PreparedCountries, search: string) => {
  return countries[search.toLowerCase()] ?? [];
}

const CountriesPage: NextPage = () => {
  const [search, setSearch] = useState('');
  const { data: countries, isLoading } = useQueryCountries()

  const lowerCaseSearch = useMemo(() => search.toLowerCase(), [search]);
  const preparedCountries = useMemo(() => indexCountries(countries ?? []), [countries]);
  const filteredCountries = useMemo( () => 
    lowerCaseSearch 
      ? searchCountries(preparedCountries, lowerCaseSearch)
      : countries
  , [countries, preparedCountries, lowerCaseSearch])

  return <main>
    <h1>Countries</h1>
    <input type="text"
      placeholder="Type a Country"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className={styles.input} 
      data-cy="country-search"
    />
    <table>
      <thead>
      </thead>
      <tbody>
        {isLoading && <tr><td>Loading Countries...</td></tr>}
        {filteredCountries?.map( country => <tr key={country.name}>
          <td>{country.name}</td>
        </tr>
        )}
      </tbody>
    </table>
  </main>
}


export default CountriesPage;