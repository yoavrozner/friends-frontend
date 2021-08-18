<template>
  <v-btn tile text @click="onClick">
    <v-icon>{{ icon }}</v-icon>
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  name: "NavIcon",
  props: ["icon", "title", "path"],
  methods: {
    onClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped></style>
