<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card v-if="group">
      <div id="join-popup">
        <h2 id="join-header">{{ $t("groups.deleteDistributionGroup") }}</h2>
        <br />
        <div id="attention-container">
          {{ $t("groups.deleteDistributionGroupAlert") }}
        </div>

        <v-card-actions id="actions">
          <SubmitButton
            color="red"
            :label="$t('groups.deleteDistributionGroupConfirm')"
            @click="onDeleteConfirm"
            fontsize="13px"
          />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as groupApi from "@/api/group";
import SubmitButton from "@/components/common/button/SubmitButton";

export default {
  name: "EditGroupPopup",
  components: { SubmitButton },

  data() {
    return {
      dialog: false,
      group: undefined,
    };
  },
  methods: {
    open(group) {
      this.group = group;
      this.dialog = true;
    },
    onDeleteConfirm() {
      groupApi.deleteGroup(this.group.id);
      this.dialog = false;
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
#attention-container {
  border: 1px solid black;
  color: red;
  font-size: 18px;
  margin: auto;
  width: 400px;
  min-height: 80px;
  padding: 10px;
}
</style>
