import getFloodStats from '@/services/getFloodStats.js'
import getDroughtStats from '@/services/getDroughtStats.js'
import getTemperatureStats from '@/services/getTemperatureStats.js'
import plantIndexService from '@/services/plantIndexService.js'

export default async function getFieldStats(fieldCoords) {
  let stats = {
    climateModules: [],
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

  const preferredPlants = plantIndexService(
    floodResults / 100,
    droughtResults / 100,
    temperatureResults.max - temperatureResults.min,
  )

  stats.preferredPlants = preferredPlants

  console.debug ('Field stats in getFieldStats:', stats)

  return stats
}
