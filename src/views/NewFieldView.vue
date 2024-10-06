<script>
import PButton from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import LocationPicker from '@/components/LocationPicker.vue'

import useMainStore from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  data() {
    return {
      name: null,
      coords: {},
      area: null,
      soilComposition: null,
    };
  },
  components: {
    PButton,
    IconField,
    InputIcon,
    InputText,
    Divider,
    LocationPicker,
  },
  computed: {
    ...mapStores(useMainStore)
  },
  methods: {
    async submit() {
      if (!this.name || !this.coords) return

      await this.mainStore.addField(this.name, this.coords, this.area, this.soilComposition)

      this.$router.replace('/')
    },
    updateCoordsFromMap(newCoords) {
      this.coords = {
        lat: newCoords.lat,
        lng: newCoords.lng,
      }
    }
  }
};
</script>

<template>
  <div class="new-wrapper">
    <div class="form-wrapper">
      <h2>Add a new field</h2>
      <em>Please don't use the H-farm Wifi, the API has reached the daily limit on that IP</em>
      <Divider />
      <LocationPicker @setCoords="updateCoordsFromMap"/>

      <IconField>
        <InputIcon class="pi pi-pencil" />
        <InputText v-model="name" placeholder="Field name" />
      </IconField>

      <IconField>
        <InputIcon class="pi pi-map-marker" />
        <InputText v-model="coords.lat" placeholder="Field latitude" />
      </IconField>

      <IconField>
        <InputIcon class="pi pi-map-marker" />
        <InputText v-model="coords.lng" placeholder="Field longitude" />
      </IconField>

      <IconField>
        <InputIcon class="pi pi-map" />
        <InputText v-model="area" placeholder="Field area (m^2)" />
      </IconField>
      <PButton @click="submit" label="Save" icon="pi pi-check" iconPos="left" />
    </div>
  </div>
</template>

<style scoped>
.new-wrapper {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100%;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  align-content: start;
  gap: 1rem;
}

h2 {
  margin-bottom: 0;
}

.p-divider {
  margin: 0 !important;
}

.p-iconfield, .p-inputtext {
  width: 100% !important;
}
</style>
