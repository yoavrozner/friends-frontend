<template>
  <v-dialog v-model="dialog" max-width="550">
    <v-card v-if="group" id="join-popup">
      <h2 id="join-header">{{ $t("groups.join") }}</h2>
      <br />
      <div id="group-infos">
        <p class="group-info">{{ $t("group.displayName") }}: {{ group.displayName }}</p>
        <p class="group-info">{{ $t("group.owner") }}: {{ group.owner.displayName }}</p>
        <p class="group-info">{{ $t("group.attendeesNumber") }}: {{ group.attendees }}</p>
      </div>
      <p id="joinTextArea">
        <TextArea :placeholder="$t('groups.joinPlaceholder')" @input="joinReason = $event" :reset="reset" />
      </p>
      <v-card-actions id="actions">
        <SubmitButton color="black" :label="$t('groups.joinRequest')" @click="onJoin" :disabled="!joinReason" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as joinApi from "@/api/join";
import TextArea from "@/components/inputs/TextArea";
import SubmitButton from "@/components/common/button/SubmitButton";

export default {
  name: "JoinGroup",
  components: { TextArea, SubmitButton },

  data() {
    return {
      dialog: false,
      group: undefined,
      joinReason: undefined,
      reset: false,
    };
  },
  methods: {
    open(group) {
      this.group = group;
      this.reset = true;
      this.joinReason = undefined;
      this.dialog = true;
    },
    onJoin() {
      this.dialog = false;
      joinApi.createJoinRequest(this.group.id);
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
#group-infos {
  margin-bottom: 25px;
  margin-right: 10px;
}
#joinTextArea {
  justify-content: center;
  display: flex;
  margin-bottom: -20px;
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
