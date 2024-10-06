<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
export default {
  name: 'MapComponent',
  data: () => ({
    zoom: 13,
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  }),
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  computed: {
    center() {
      return [
        this.coords.lat,
        this.coords.lng,
      ]
    }
  },
  props: {
    coords: {
      required: true
    }
  },
}
</script>

<template>
  <div class="location-wrapper" style="height:10rem;">
    <LMap ref="map" style="height: 10rem" :zoom="zoom" :center="center" :use-global-leaflet="false">
      <LTileLayer :url="url" layer-type="base" use-global-leaflet="false"></LTileLayer>
      <LMarker
        visible
        :lat-lng="center" />
    </LMap>
  </div>
</template>

<style scoped>
:deep(.leaflet-control-attribution), :deep(.leaflet-control-container) {
  display: none !important;
}

.leaflet-container {
  border-radius: 12px 12px 0 0;
}

@media (max-width: 700px) {
  .leaflet-container, .location-wrapper {
    height: 20rem;
    width: 15rem;
  }
}
</style>
