import { defineStore } from 'pinia'
import getFieldStats from '@/services/getFieldStats.js'
import Field from '@/models/field.js'

export default defineStore('main', {
  state: () => ({
    fields: [],
    userPosition: {
      lat: 45.5677257,
      lng: 12.4284457,
    },
  }),
  getters: {},
  actions: {
    restoreLocalStorage() {
      const savedFields = JSON.parse(localStorage.getItem('fields') ?? '[]')

      savedFields.forEach((value) => {
        //if field doesn't already exist in store, add it from local storage
        if (!this.fields[value.id]) this.fields.push(value)
      })

      //make sure that store and local storage are in sync
      localStorage.setItem('fields', JSON.stringify(this.fields))
    },

    async addField(name, fieldCoords, area, soilComposition) {
      const fieldStats = await getFieldStats(fieldCoords, area)

      console.debug('Adding field with following fieldStats: ', fieldStats)

      const field = new Field(
        name,
        fieldCoords,
        fieldStats.climateModules,
        fieldStats.preferredPlants,
        area,
        soilComposition,
        fieldStats.maxTemp,
        fieldStats.minTemp,
      )
      this.fields.push(field)

      //save to local storage
      localStorage.setItem('fields', JSON.stringify(this.fields))
    },

    deleteField(id) {
      console.debug('Deleting field with following id: ', id)

      this.fields = this.fields.filter((field) => field.id !== id)

      localStorage.setItem('fields', JSON.stringify(this.fields))
    },

    setUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          this.userPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
        });
      }
    }
  },
})
