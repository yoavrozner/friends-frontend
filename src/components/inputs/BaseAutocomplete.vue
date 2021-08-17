<template>
  <div id="input-container">
    <div v-if="label" id="label">{{ label }}</div>
    <v-autocomplete
      v-model="item"
      @input="onSelect"
      @update:search-input="onInput"
      @keyup.enter.native="onEnter"
      no-filter
      :items="items"
      :loading="isLoading"
      filled
      rounded
      item-text="displayName"
      return-object
      :append-icon="icon"
      color="#035c64"
      :background-color="background"
      :placeholder="placeholder"
      :class="{ disableInput: disabled }"
    >
      <template v-slot:no-data>
        <p id="no-resault">{{ validationFailedMsg ? validationFailedMsg : $t("autocomplete.noResult") }}</p>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  data: () => ({
    item: null,
    value: "",
    validationFailedMsg: null,
  }),
  props: [
    "placeholder",
    "items",
    "background",
    "icon",
    "isLoading",
    "minLength",
    "noResult",
    "disabled",
    "validation",
    "label",
    "rules",
  ],
  methods: {
    onSelect() {
      this.$emit("select", this.item);
    },
    onEnter() {
      this.item = "";
      this.$emit("enter", this.value);
    },
    onInput(value) {
      this.value = value;
      const validationMsg = this.validation && value && value.length > 1 ? this.validation(value) : null;
      if (!validationMsg) {
        this.validationFailedMsg = false;
        this.onSearch(value);
      } else {
        this.validationFailedMsg = validationMsg;
      }
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength) this.$emit("type", value);
    }, 500),
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
#no-result {
  padding-right: 20px;
}
.disableInput {
  pointer-events: none;
}
</style>
