<template>
  <div id="expansion-container">
    <v-expansion-panels id="expansion-panel">
      <v-expansion-panel v-for="(itemKey, i) in itemsKeys" :key="i">
        <v-expansion-panel-header v-if="!items[itemKey].limit || isApprover" :color="items[itemKey].color">
          <h3 id="expansion-header">{{ items[itemKey].name }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content id="expansion-content">
          <component v-bind:is="itemKey"></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import join from "./joinGroup.vue";
import create from "./createGroup.vue";
import owner from "./ownerGroup.vue";
import { mapGetters } from "vuex";

export default {
  name: "ExpansionPanel",
  props: ["items"],
  components: { join, create, owner },
  computed: {
    ...mapGetters(["isApprover"]),
  },
  data() {
    return {
      itemsKeys: Object.keys(this.items),
    };
  },
  watch: {
    items: {
      handler: function(val) {
        this.items = val;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#expansion-container {
  display: flex;
  justify-content: center;
}
#expansion-panel {
  margin-top: 20px;
  max-width: 1500px;
}
#expansion-header {
  opacity: 0.6;
}
</style>
