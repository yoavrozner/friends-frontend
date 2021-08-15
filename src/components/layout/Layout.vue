<template>
  <v-app>
    <Appbar />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/layout/Appbar.vue";

export default {
  name: "Layout",
  components: { Appbar },
};
</script>

<style scoped>
</style>