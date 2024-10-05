export default class Field {
  constructor(name, coords, climateModules, preferredPlants, area, soilComposition, maxTemp, minTemp) {
    this.name = name
    this.coords = coords
    this.climateModules = climateModules
    this.preferredPlants = preferredPlants
    this.area = area
    this.soilComposition = soilComposition
    this.maxTemp = maxTemp
    this.minTemp = minTemp

    console.debug('Getting', localStorage.getItem('fields') ?? '[]')
    const fields = JSON.parse(localStorage.getItem('fields') ?? '[]') ?? []
    this.id = fields.length
  }
}
