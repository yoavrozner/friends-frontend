<template>
  <div>
    <Header :txt="$t('pages.createGroup')" />
    <GroupForm @complete="onComplete" />
    <NotePopup ref="notePopup" @complete="onCreateComplete" :note="$t('notes.owner')" />
  </div>
</template>

<script>
import * as createApi from "@/api/create";
import Header from "@/components/common/text/Header";
import GroupForm from "@/components/group/GroupForm";
import NotePopup from "@/components/common/popups/NotePopup.vue";

export default {
  name: "CreateGroup",
  components: { Header, GroupForm, NotePopup },
  methods: {
    onComplete(group) {
      this.$refs.notePopup.open(group);
    },
    onCreateComplete(group) {
      createApi.createGroupRequest({
        approverId: group.approverId,
        groupName: group.groupName,
        hierarchy: group.hierarchy,
        type: group.type,
        displayName: group.displayName,
        classification: group.classification,
        members: group.members,
      });
    },
  },
};
</script>

<style scoped></style>
