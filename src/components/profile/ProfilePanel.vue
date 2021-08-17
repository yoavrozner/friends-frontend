<template>
  <div id="expansion-container">
    <v-expansion-panels id="expansion-panel">
      <v-expansion-panel v-for="(itemKey, i) in itemsKeys" :key="i">
        <v-expansion-panel-header :color="items[itemKey].color">
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
import myRequest from "./myRequest.vue";
import ownedGroups from "./ownedGroups.vue";
import myGroups from "./myGroups.vue";

export default {
  name: "ExpansionPanel",
  props: ["items"],
  components: { myRequest, ownedGroups, myGroups },
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
#expansion-content {
}
</style>
