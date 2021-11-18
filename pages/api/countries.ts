import type { NextApiRequest, NextApiResponse } from 'next'

type CountriesRes = [
  { name: { common: string } },
]

type Country = {
  name: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[]>
) {
  fetch('https://restcountries.com/v3.1/all')
    .then<CountriesRes>( response => response.json() ?? [] )
    .then( countries => countries.map( country => ({ name: country.name.common }) ) )
    .then( countries => res.status(200).json(countries) )
    .catch( error => res.status(500).json(error) )
}
