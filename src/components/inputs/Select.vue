<template>
  <div id="select" @select="$emit('select', value)">
    <v-select v-model="value" :items="items" :label="label" solo></v-select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: ["label", "items"],
  data() {
    return {
      value: undefined,
    };
  },
};
</script>

<style scoped>
#select {
  width: 200px;
}
</style>