import {ICountry} from './ICountry'

export const getCountries = (): Promise<ICountry[]> =>
  new Promise((resolve, reject) => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then((result: any[]) => {
        const countries = result.map((data: any) => {
          const {region, subregion, name, capital, population} = data
          return {region, subregion, name, capital, population} as ICountry
        })
        resolve(countries)
      })
      .catch(reject)
  })
