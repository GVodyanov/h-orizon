<script>
import Card from 'primevue/card'
import PButton from 'primevue/button'
import MeterGroup from 'primevue/metergroup';
import useMainStore from '@/stores/mainStore.js'
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';
import MapComponent from '@/components/MapComponent.vue'
import { mapStores } from 'pinia'

export default {
  data() {
    return {}
  },
  components: {
    Card,
    PButton,
    MeterGroup,
    Divider,
    MapComponent,
    Chip,
  },
  computed: {
    ...mapStores(useMainStore)
  },
  methods: {
    async deleteField(id) {
      this.mainStore.deleteField(id)
    },

    formatClimate(climate) {
      let color = 'lightgray'

      if (climate.type === 'flood') color = 'lightblue'
      if (climate.type === 'drought') color = 'coral'
      if (climate.type === 'climate change') color = 'lightgreen'

      return [{
        label: climate.type.charAt(0).toUpperCase() + climate.type.slice(1),
        value: climate.probability,
        color: color,
      }]
    },

    formatPlants(plant) {
      return [{
        label: plant.name.charAt(0).toUpperCase() + plant.name.slice(1),
        value: plant.suggestionIndex * 100,
        color: 'coral'
      }]
    },
  }
}
</script>

<template>
  <h3 v-if="!mainStore.fields.length">
    No fields set, lets get started: <PButton icon="pi pi-file-plus" @click="$router.replace('/new')"></PButton>
  </h3>
  <div v-else class="home-wrapper">
    <h2>Here are your fields</h2>

    <div class="card-wrapper">
      <Card :key="field.id" v-for="field in mainStore.fields">
        <template #header>
          <MapComponent :coords="field.coords" />
        </template>
        <template #title>
          <div class="title-wrapper">
            <span>{{ field.name }}</span>

            <PButton
              icon="pi pi-trash"
              @click="deleteField(field.id)"
              severity="secondary"
            ></PButton>
          </div>
        </template>

        <template #subtitle>
          <font-awesome-icon icon="fa-solid fa-fire" />
          <div class="subtitle-wrapper">
            <Chip :label="`${field.area}m^2`" icon="pi pi-map"/>
            <Chip :label="`${field.maxTemp}°C`" icon="pi pi-plus"/>
            <Chip :label="`${field.minTemp}°C`" icon="pi pi-minus"/>
          </div>
        </template>

        <template #content>
          <Divider />
          <div class="stat-wrapper">
            <span><i style="font-size: 0.8rem" class="pi pi-sun" />   Expected climate: </span>
            <div class="stat-container" v-for="climate in field.climateModules">
              <MeterGroup :value="formatClimate(climate)"></MeterGroup>
            </div>
          </div>
          <Divider />
          <div class="stat-wrapper">
            <span><i style="font-size: 0.8rem" class="pi pi-wave-pulse" />   Suggested crops: </span>
            <div class="stat-container" v-for="plant in field.preferredPlants">
              <MeterGroup :value="formatPlants(plant)"></MeterGroup>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.p-card {
  min-width: calc(50% - 0.5rem);
}

.title-wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  color: var(--p-primary-color);
  font-weight: bold;
}

.stat-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subtitle-wrapper {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

h3 {
  padding-top: 3rem;
  text-align: center;
  font-weight: normal;
}

@media (max-width: 700px) {
  .card-wrapper {
    flex-direction: column;
  }

  .p-card {
    min-width: 100%;
  }
}

</style>
