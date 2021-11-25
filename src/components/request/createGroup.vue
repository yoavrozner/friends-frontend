<template>
  <div>
    <Table
      :headers="$t('request.tabs.create.headers')"
      :items="createRequestsApprover"
      @approve="onApprove"
      @deny="onDeny"
    />
  </div>
</template>

<script>
import * as createApi from "@/api/create";
import Table from "@/components/common/table/Table";
import { mapGetters } from "vuex";

export default {
  name: "createGroup",
  components: { Table },
  computed: {
    ...mapGetters(["createRequestsApprover"]),
  },
  methods: {
    onDeny(request) {
      createApi.denyGroupRequest(request._id);
      this.$store.dispatch("fetchCreateRequestsApprover");

    },
    onApprove(request) {
      console.log(this.createRequestsApprover);
      createApi.approveGroupRequest(request._id);
      this.$store.dispatch("fetchCreateRequestsApprover");

    },
  },
};
</script>

<style scoped></style>
