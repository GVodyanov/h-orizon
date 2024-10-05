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
  <div style="height:10rem;">
    <LMap ref="map" style="height: 10rem" :zoom="zoom" :center="center" :use-global-leaflet="false">
      <LTileLayer :url="url" layer-type="base" use-global-leaflet="false"></LTileLayer>
      <LMarker
        visible
        :lat-lng="center" />
    </LMap>
  </div>
</template>

<style scoped>
:deep(.leaflet-control-attribution) {
  display: none !important;
}
</style>
