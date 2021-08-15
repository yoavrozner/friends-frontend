<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" size="50" icon :color="color" @click="$emit('click')">
        <v-icon >{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "IconButton",
  props: ["icon", "color", "tooltip"],
};
</script>

<style scoped>
</style>