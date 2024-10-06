<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import useMainStore from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  name: 'LocationPicker',
  data: () => ({
    zoom: 9,
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    userPosition: {},
    position: {},
  }),
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  computed: {
    ...mapStores(useMainStore)
  },
  methods: {
    onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng;
      this.$emit('setCoords', {
        lat: value.latlng.lat,
        lng: value.latlng.lng,
      });
    },
  },
  emits: ['setCoords']
}
</script>

<template>
  <div class="location-wrapper" style="height:20rem; width: 30rem;">
    <LMap @click="onMapClick"
        ref="map"
        style="height: 20rem"
        :zoom="zoom"
        :center="[
          mainStore.userPosition.lat,
          mainStore.userPosition.lng,
        ]"
        :use-global-leaflet="false"
    >
      <LTileLayer :url="url" layer-type="base" use-global-leaflet="false"></LTileLayer>
      <LMarker
        v-if="position.lat && position.lng"
        visible
        :lat-lng.sync="position" />
    </LMap>
  </div>
</template>

<style scoped>
:deep(.leaflet-control-attribution) {
  display: none !important;
}

.leaflet-container {
  border-radius: 12px;
}

@media (max-width: 700px) {
  .leaflet-container, .location-wrapper {
    height: 20rem !important;
    width: 15rem !important;
  }

  .location-wrapper {
    align-self: center;
  }
}

</style>
