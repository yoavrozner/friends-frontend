<template>
  <div id="input-container">
    <div v-if="label" id="label">{{ label }}</div>
    <v-text-field
      :placeholder="placeholder"
      @input="$emit('input', value)"
      v-model="value"
      :solo="solo != null ? solo : true"
      :filled="filled != null ? filled : false"
      :required="required != null ? required : false"
      :rules="rules != null ? rules : []"
      :disabled="readonly != null ? readonly : false"
      :prefix="prefix != null ? prefix : ''"
      :hint="hint != null ? hint : ''"
      :persistent-hint="hint != null"
      :maxlength="maxlength != null ? maxlength : false"
      :counter="maxlength != null"
      @keydown="restrictCharacters"
      :error="error != null ? error : false"
      :error-messages="errors"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: [
    "label",
    "placeholder",
    "required",
    "rules",
    "startValue",
    "readonly",
    "solo",
    "filled",
    "reset",
    "prefix",
    "hint",
    "maxlength",
    "restrictPattern",
    "validator",
    "error",
  ],
  methods: {
    restrictCharacters(e) {
      if (this.restrictPattern && !e.key.match(this.restrictPattern)) {
        e.preventDefault();
      }
    },
  },
  data() {
    return {
      errors: "",
      value: this.startValue ? this.startValue : "",
    };
  },
  watch: {
    reset(val) {
      if (val) {
        this.value = this.startValue ? this.startValue : "";
      }
    },
    startValue(val) {
      this.value = val;
    },
    error() {
      this.errors = this.validator();
    },
  },
};
</script>

<style scoped>
#input-container {
  display: flex;
}
#label {
  background-color: #00b0f0;
  padding: 8px;
  color: white;
  font-size: 20px;
  height: 48px;
  margin-left: 30px;
  width: 200px;
  border-radius: 10px;
}
</style>
