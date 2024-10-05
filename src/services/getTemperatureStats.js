import axios from 'axios'
import { linearRegression } from 'simple-statistics'

export default async function getTemperatureStats(coords) {
  const response = await axios.get('https://climate-api.open-meteo.com/v1/climate', {
    params: {
      latitude: coords.lat,
      longitude: coords.lng,
      start_date: '1990-01-01',
      end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
      daily: 'temperature_2m_mean',
      models: 'EC_Earth3P_HR'
    }
  }).catch(function (error) {
    // handle error
    console.error(error)
    return null
  })

  let temperatures = []
  for (let i = 1990; i < new Date().getFullYear(); i++) {
    const pointer = response.data.daily.time.indexOf(`${i}-07-01`)

    temperatures.push([pointer, response.data.daily.temperature_2m_mean[pointer]])
  }

  const regression = linearRegression(temperatures)

  const lastYear = new Date().getFullYear() - 1
  const startPointer = response.data.daily.time.indexOf(`${lastYear}-01-01`)
  const endPointer = response.data.daily.time.indexOf(`${lastYear}-12-31`)
  const lastYearList = response.data.daily.temperature_2m_mean.slice(startPointer, endPointer)

  console.debug('Temperature stats:', (regression.m / 2) * 1000000, Math.min(...lastYearList), Math.max(...lastYearList))
  return {'regression': (regression.m) * 1000000, 'min': Math.min(...lastYearList), 'max': Math.max(...lastYearList)}
}
