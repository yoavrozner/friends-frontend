<template>
  <div id="select">
    <v-select
      v-model="value"
      :items="items"
      @change="$emit('select', value)"
      item-text="label"
      item-value="value"
      :rules="rules ? rules : []"
      :label="label"
      solo
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: ["label", "items", "rules"],
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
