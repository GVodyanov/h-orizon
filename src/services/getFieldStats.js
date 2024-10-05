import getFloodStats from '@/services/getFloodStats.js'
import getDroughtStats from '@/services/getDroughtStats.js'
import getTemperatureStats from '@/services/getTemperatureStats.js'

export default async function getFieldStats(fieldCoords) {
  let stats = {
    climateModules: [],
    preferredPlants: [
      {
        name: "rice",
        suggestionIndex: 0.9,
      }
    ]
  }

  const floodResults = await getFloodStats(fieldCoords)
  if (floodResults !== null) {
    stats.climateModules.push({
      type: 'flood',
      probability: floodResults,
    })
  }

  const droughtResults = await getDroughtStats(fieldCoords)
  if (droughtResults !== null) {
    stats.climateModules.push({
      type: 'drought',
      probability: droughtResults,
    })
  }

  const temperatureResults = await getTemperatureStats(fieldCoords)
  if (temperatureResults !== null) {
    stats.climateModules.push({
      type: 'climate change',
      probability: temperatureResults.regression,
    })
  }

  stats.maxTemp = temperatureResults.max
  stats.minTemp = temperatureResults.min

  console.debug ('Field stats in getFieldStats:', stats)

  return stats
}
