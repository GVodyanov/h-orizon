import axios from 'axios'
import { sampleStandardDeviation } from 'simple-statistics'

export default async function getFloodStats(coords) {
  const response = await axios.get('https://flood-api.open-meteo.com/v1/flood', {
    params: {
      latitude: coords.lat,
      longitude: coords.lng,
      forecast_days: 90,
      past_days: 90,
      daily: 'river_discharge_mean',
    }
  }).catch(function (error) {
      // handle error
      console.error(error)
      return null
    })

  const index = sampleStandardDeviation(response.data.daily.river_discharge_mean) * 10
  console.debug('Flood index:', index)

  return index
}
