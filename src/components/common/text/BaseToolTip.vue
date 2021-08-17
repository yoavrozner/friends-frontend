<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <p v-on="on" id="value">{{ value }}</p>
    </template>
    <span>{{ value }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "BaseTooltip",
  props: ["value"],
};
</script>

<style scoped>
#value {
  width: 390px;
  margin-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
