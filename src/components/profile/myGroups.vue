<template> <Table :headers="$t('profile.tabs.myGroups.headers')" :items="myGroups"/></template>

<script>
import Table from "@/components/common/table/Table";
import { mapGetters } from "vuex";

export default {
  name: "myGroups",
  components: { Table },
  computed: {
    ...mapGetters(["myGroups"]),
  },
};
</script>

<style scoped></style>
