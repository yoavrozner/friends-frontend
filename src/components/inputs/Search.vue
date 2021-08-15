<template>
  <v-text-field
    v-model="value"
    solo
    :label="label"
    clearable
    append-icon="mdi-magnify"
    @keyup.enter.native="$emit('enter', value)"
    @click:append="$emit('enter', value)"
  ></v-text-field>
</template>

<script>
export default {
  name: "Search",
  props: ["label"],
  data() {
    return {
      value: "",
    };
  },
};
</script>