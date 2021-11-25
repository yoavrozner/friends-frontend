<template>
  <div>
    <Header :txt="$t('pages.createGroup')" />
    <GroupForm @complete="onComplete" />
    <NotePopup ref="notePopup" @complete="onCreateComplete" :note="$t('notes.owner')" />
  </div>
</template>

<script>
import store from "@/store";
import * as createApi from "@/api/create";
import Header from "@/components/common/text/Header";
import GroupForm from "@/components/group/GroupForm";
import NotePopup from "@/components/common/popups/NotePopup.vue";
import { mapGetters } from "vuex";

export default {
  name: "CreateGroup",
  components: { Header, GroupForm, NotePopup },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    onComplete(group) {
      this.$refs.notePopup.open(group);
    },
    onCreateComplete(group) {
      console.log(group);
      createApi.createGroupRequest({
        approverId: group.approver[0] || { sAMAccountName: this.user.email.split("@")[0], displayName: `- ${this.user.name.firstName} ${this.user.name.lastName}` },
        groupName: group.groupName,
        hierarchy: group.hierarchy,
        type: group.type,
        displayName: group.displayName,
        classification: group.classification,
        members: group.members,
        owner: this.user.email.split("@")[0],
      }).then(() => {console.log("success");store.dispatch('onSuccess'); this.$router.push({ path: "/profile" })});
    },
  },
};
</script>

<style scoped></style>
