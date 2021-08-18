<template>
  <div>
    <Table :headers="$t('profile.tabs.ownedGroups.headers')" :items="ownedGroups" @edit="onGroupEdit" />
    <EditGroupPopup ref="editGroup" @edit="editGroup" />
  </div>
</template>

<script>
import Table from "@/components/common/table/Table";
import EditGroupPopup from "@/components/common/popups/editGroupPopup/editGroupPopup.vue";
import { mapGetters } from "vuex";

export default {
  name: "ownedGroups",
  components: { Table, EditGroupPopup },
  computed: {
    ...mapGetters(["ownedGroups"]),
  },
  methods: {
    async onGroupEdit(group) {
      this.$refs.editGroup.open(group);
    },
    editGroup(group) {
      console.log(group);
    },
  },
};
</script>

<style scoped></style>
