<template>
  <v-text-field
    v-model="value"
    solo
    :label="label"
    clearable
    append-icon="mdi-magnify"
    @keyup.enter.native="$emit('search', value)"
    @click:append="$emit('search', value)"
    @click:clear="$emit('clear')"
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