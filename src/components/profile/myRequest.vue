<template> <Table :headers="$t('profile.tabs.myRequest.headers')" :items="requests"/></template>

<script>
import Table from "@/components/common/table/Table";
import { mapGetters } from "vuex";

export default {
  name: "myRequest",
  components: { Table },
  computed: {
    ...mapGetters(["requests"]),
  },
};
</script>

<style scoped></style>
