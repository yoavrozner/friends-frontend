<template>
  <v-btn
    @click="$emit('click')"
    :color="color"
    id="confirm-button"
    :disabled="disabled"
    v-bind:style="{ fontSize: fontsize ? fontsize : '20px' }"
    v-bind:class="[size]"
  >
    <v-icon v-if="icon" left>{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "SubmitButton",
  props: ["color", "label", "disabled", "size", "fontsize", "icon"],
};
</script>

<style scoped>
#confirm-button {
  min-width: 100px;
  width: fit-content;
  height: 50px;
  line-height: 44px;
  border-radius: 22px;
  box-shadow: 0 3px 8px 0 rgba(44, 52, 72, 0.4);
  background-color: #2c3448;
  color: white;
  margin: 10px 0 8px 5px;
}
</style>
