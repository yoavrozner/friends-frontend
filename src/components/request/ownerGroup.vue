<template>
  <div>
    <Table
      :headers="$t('request.tabs.owner.headers')"
      :items="ownerRequestsApprover"
      @approve="onApprove"
      @deny="onDeny"
    />
    <NotePopup ref="notePopup" @complete="onApproveComplete" :note="$t('notes.addOwner')" />
  </div>
</template>

<script>
import * as ownerApi from "@/api/owner";
import Table from "@/components/common/table/Table";
import NotePopup from "@/components/common/popups/NotePopup.vue";
import { mapGetters } from "vuex";

export default {
  name: "ownerGroup",
  components: { Table, NotePopup },
  computed: {
    ...mapGetters(["ownerRequestsApprover"]),
  },
  methods: {
    onDeny(request) {
      ownerApi.denyJoinRequest(request._id);
      this.$store.dispatch("fetchOwnerRequestsApprover");
    },
    onApprove(request) {
      this.$refs.notePopup.open(request);
    },
    onApproveComplete(request) {
      ownerApi.approveOwnerRequest(request._id);
      this.$store.dispatch("fetchOwnerRequestsApprover");
    },
  },
};
</script>

<style scoped></style>
