<template>
  <v-card id="group" @click="$emit('click', group.id)">
    <h3 id="group-name">{{ group.displayName }}</h3>
    <p>{{ $t("group.owner") }}: {{ group.owner.displayName }}</p>
    <p>{{ $t("group.attendeesNumber") }}: {{ group.attendees }}</p>
  </v-card>
</template>

<script>
export default {
  name: "Group",
  props: ["group"],
};
</script>

<style scoped>
#group {
  width: 300px;
  height: 170px;
  font-size: 13px;
  text-align: right;
  padding: 20px;
  margin: 10px;
}
#group-name {
  text-align: center;
  margin-bottom: 10px;
}
</style>
