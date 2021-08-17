<template>
  <v-radio-group v-model="value" @change="$emit('change', value)" :rules="rules ? rules : []">
    <v-radio v-for="item in items" :key="item.value" :label="item.label" :value="item.value"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: "Radio",
  props: ["items", "rules"],
  data() {
    return {
      value: undefined,
    };
  },
};
</script>
