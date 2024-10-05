import axios from 'axios'
import droughtIndexService from '@/services/droughtIndexService.js'

export default async function getDroughtStats(coords) {
  const response = await axios.get('https://climate-api.open-meteo.com/v1/climate', {
    params: {
      latitude: coords.lat,
      longitude: coords.lng,
      start_date: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
      end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
      daily: 'precipitation_sum',
      models: 'EC_Earth3P_HR'
    }
  }).catch(function (error) {
      // handle error
      console.error(error)
      return null
    })

  const index = droughtIndexService(response.data.daily.precipitation_sum)
  console.debug('Drought index:', index)

  return index
}
