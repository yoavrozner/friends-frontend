<template>
  <div id="input-container">
    <v-textarea
      solo
      name="input-7-4"
      :label="placeholder"
      :hint="placeholder"
      @input="$emit('input', value)"
      v-model="value"
      auto-grow
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: ["placeholder", "reset"],
  data() {
    return {
      value: "",
    };
  },
  watch: {
    reset(value) {
      if (value) this.value = "";
    },
  },
};
</script>

<style scoped>
#input-container {
  width: 510px;
}
</style>
