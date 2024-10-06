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

      if (climate.type === 'flood') color = '#016a8a'
      if (climate.type === 'drought') color = '#9e6240'
      if (climate.type === 'climate change') color = '#bbbbbb'

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
            <Chip>
              <span class="material-symbols-outlined">local_fire_department</span>
              {{ field.maxTemp }}°C
            </Chip>
            <Chip>
              <span class="material-symbols-outlined">ac_unit</span>
              {{ field.minTemp }}°C
            </Chip>
          </div>
        </template>

        <template #content>
          <Divider />
          <div class="stat-wrapper">
            <span><i style="font-size: 0.8rem" class="pi pi-sun" />   Expected climate: </span>
            <div class="stat-container" v-for="climate in field.climateModules">
              <MeterGroup labelPosition="start" :value="formatClimate(climate)"></MeterGroup>
            </div>
          </div>
          <Divider />
          <span><i style="font-size: 0.8rem" class="pi pi-wave-pulse" />   Suggested crops: </span>
          <div class="chip-wrapper">
            <Chip v-for="plant in field.preferredPlants" :label="plant"/>
            <Chip v-if="!field.preferredPlants.length" label="Non suitable area" />
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
  width: calc(50% - 0.5rem);
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
  text-overflow: ellipsis;
  overflow-x: clip;
  white-space: nowrap;
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
  flex-wrap: wrap;
}

h3 {
  padding-top: 3rem;
  text-align: center;
  font-weight: normal;
  line-height: 2;
}

.chip-wrapper {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .card-wrapper {
    flex-direction: column;
  }

  .p-card {
    min-width: 100%;
  }

  :deep(.p-card-header) {
    display: flex;
    justify-content: center;
  }
}

</style>
