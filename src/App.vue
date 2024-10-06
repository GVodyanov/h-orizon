<script>
import { RouterView, RouterLink } from 'vue-router'
import Menubar from 'primevue/menubar'
import PButton from 'primevue/button'
import Chip from  'primevue/chip'

export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          route: '/'
        },
        {
          label: 'Share your experiences',
          icon: 'pi pi-comments',
          route: '/'
        },
        {
          label: 'AI analyzer',
          icon: 'pi pi-sparkles',
          route: '/'
        },
      ]
    };
  },
  components: {
    RouterView,
    RouterLink,
    Menubar,
    PButton,
    Chip,
  },
  computed: {
    checkBrowserLightDark() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return '/logo.png'
      } else {
        return '/logo_dark.png'
      }
    }
  }
};

</script>

<template>
  <Menubar :model="items">
    <template #start>
      <img :src="checkBrowserLightDark" alt="Logo" height="35">
    </template>
    <template #item="{ item, props }">
      <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
    <template #end>
      <RouterLink to="/new">
        <PButton icon="pi pi-file-plus" label="New"></PButton>
      </RouterLink>
    </template>
  </Menubar>
  <RouterView />
  <a class="chip-wrapper" target="_blank" href="https://docs.google.com/document/d/1iXgAsjnM8BrwbnhjNNXt5IsYu-Sg2T0p/edit?usp=sharing&ouid=107968380404346585295&rtpof=true&sd=true">
    <Chip icon="pi pi-link" label="Find out more" />
  </a>
</template>

<style scoped>
.chip-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem 1rem;
  opacity: 0.3;
}
</style>
