<template>
  <div id="input-container">
    <div v-if="label" id="label">{{ label }}</div>
    <v-chip-group show-arrows>
      <v-chip v-for="user in users" :key="user.id" color="#1a5ca3" id="chip">
        <v-icon id="user-icon">mdi-account-outline </v-icon>
        <p>{{ user.displayName }}</p>
        <v-btn icon color="white" @click="$emit('remove', user)">
          <v-icon id="close-icon">mdi-close</v-icon>
        </v-btn>
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  name: "Chips",
  props: ["users", "label"],
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
#user-icon {
  font-size: 18px;
  margin-left: 5px;
}
#chip {
  margin: 6px 4px;
  color: white;
  direction: rtl;
}
#close-icon {
  font-size: 15px;
}
.v-btn--icon.v-size--default {
  width: 22px;
  margin-right: 5px;
  height: 22px;
}
</style>
