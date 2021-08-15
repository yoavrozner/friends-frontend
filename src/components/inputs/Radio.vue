<template>
  <v-radio-group v-model="value" @change="$emit('change', value)" row>
    <v-radio
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: "Radio",
  props: ["items"],
  data() {
    return {
      value: undefined,
    };
  },
};
</script>