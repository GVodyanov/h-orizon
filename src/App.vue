<script>
import { RouterView, RouterLink } from 'vue-router'
import Menubar from 'primevue/menubar';

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
          label: 'New',
          icon: 'pi pi-file-plus',
          route: '/new'
        },
      ]
    };
  },
  components: {
    RouterView,
    RouterLink,
    Menubar,
  }
};

</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props }">
      <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
  </Menubar>
  <RouterView />
</template>

<style scoped>

</style>
