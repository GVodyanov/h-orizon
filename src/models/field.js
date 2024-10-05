export default class Field {
  constructor(name, coords, climateModules, preferredPlants, vegetation, vegetationArea, soilComposition) {
    this.name = name
    this.coords = coords
    this.climateModules = climateModules
    this.preferredPlants = preferredPlants
    this.vegetation = vegetation
    this.vegetationArea = vegetationArea
    this.soilComposition = soilComposition

    console.debug('Getting', localStorage.getItem('fields') ?? '[]')
    const fields = JSON.parse(localStorage.getItem('fields') ?? '[]') ?? []
    this.id = fields.length
  }
}
