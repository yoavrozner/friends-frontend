<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card v-if="group">
      <div id="join-popup">
        <h2 id="join-header">{{ $t("groups.moreInfo") }}</h2>
        <br />
        <div id="group-infos">
          <p class="group-info">{{ $t("group.attendeesNumber") }}: {{ group.attendees }}</p>
          <p class="group-info">{{ $t("group.displayName") }}: {{ group.displayName }}</p>
          <p class="group-info">{{ $t("group.sAMAccountName") }}: {{ group.sAMAccountName }}</p>
        </div>
        <p id="group-edit-form">
          <EditGroupForm :group="group" :reset="reset" />
        </p>
        <v-card-actions id="actions">
          <SubmitButton
            v-if="canDeleteGroup"
            color="red"
            :label="$t('groups.deleteDistributionGroup')"
            @click="onDelete"
            fontsize="13px"
          />
        </v-card-actions>
      </div>
      <DeleteGroupPopup ref="deleteGroup" />
    </v-card>
  </v-dialog>
</template>

<script>
import EditGroupForm from "./editGroupForm";
import SubmitButton from "@/components/common/button/SubmitButton";
import DeleteGroupPopup from "./deleteGroupPopup";
import { isDistributionGroup } from "@/utils/group";

export default {
  name: "EditGroupPopup",
  components: { SubmitButton, EditGroupForm, DeleteGroupPopup },

  data() {
    return {
      dialog: false,
      group: undefined,
      reset: false,
      edit: false,
    };
  },
  methods: {
    open(group) {
      this.group = group;
      this.reset = true;
      this.dialog = true;
    },
    onDelete() {
      this.$refs.deleteGroup.open(this.group);
      this.dialog = false;
    },
  },
  computed: {
    canDeleteGroup() {
      return isDistributionGroup(this.group);
    },
  },
  watch: {
    dialog: function(val) {
      if (!val) this.reset = false;
    },
  },
};
</script>

<style scoped>
#join-popup {
  margin-right: 25px;
}
#group-infos {
  margin-bottom: 25px;
  margin-right: 10px;
}
#actions {
  justify-content: center;
}
.group-info {
  text-align: right;
  margin: 1px 0;
  font-size: 16px;
  color: gray;
  font-weight: bold;
}
</style>
