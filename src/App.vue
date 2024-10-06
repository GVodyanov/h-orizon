<script>
import { RouterView, RouterLink } from 'vue-router'
import Menubar from 'primevue/menubar';
import PButton from 'primevue/button';

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
      ]
    };
  },
  components: {
    RouterView,
    RouterLink,
    Menubar,
    PButton,
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
    <template #end>
      <RouterLink to="/new">
        <PButton icon="pi pi-file-plus" label="New"></PButton>
      </RouterLink>
    </template>
  </Menubar>
  <RouterView />
</template>

<style scoped>

</style>
