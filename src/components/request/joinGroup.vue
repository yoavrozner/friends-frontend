<template>
  <div>
    <Table
      :headers="$t('request.tabs.join.headers')"
      :items="joinRequestsApprover"
      @approve="onApprove"
      @deny="onDeny"
    />
    <NotePopup ref="notePopup" @complete="onApproveComplete" :note="$t('notes.member')" />
  </div>
</template>

<script>
import * as joinApi from "@/api/join";
import Table from "@/components/common/table/Table";
import NotePopup from "@/components/common/popups/NotePopup.vue";
import { mapGetters } from "vuex";

export default {
  name: "joinGroup",
  components: { Table, NotePopup },
  computed: {
    ...mapGetters(["joinRequestsApprover"]),
  },
  methods: {
    onDeny(request) {
      joinApi.denyJoinRequest(request.id);
    },
    onApprove(request) {
      this.$refs.notePopup.open(request);
    },
    onApproveComplete(request) {
      joinApi.approveJoinRequest(request.id);
    },
  },
};
</script>

<style scoped></style>
