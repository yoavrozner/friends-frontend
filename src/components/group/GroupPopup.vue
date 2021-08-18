<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card v-if="group" id="group-popup">
      <h2 id="group-name">{{ group.displayName }}</h2>
      <p class="group-info">{{ $t("group.owner") }}: {{ group.owner.displayName }}</p>
      <p class="group-info">{{ $t("group.attendeesNumber") }}: {{ group.attendees }}</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>{{ $t("user.mail") }}</th>
              <th>{{ $t("user.name") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in group.members" :key="member.sAMAccountName">
              <td>{{ member.sAMAccountName }}</td>
              <td>{{ member.displayName }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions id="actions">
        <IconButton v-if="joinGroup()" icon="mdi-account-plus" color="orange" :tooltip="$t('groups.join')" @click="onJoinClick" />
        <IconButton v-if="groupInfo() && !joinGroup()" icon="mdi-pencil-outline" color="orange" :tooltip="$t('groups.moreInfo')" @click="onInfoClick" />
      </v-card-actions>
    </v-card>
    <JoinPopup ref="groupJoin" />
    <EditGroupPopup ref="groupInfo" />
  </v-dialog>
</template>

<script>
import IconButton from "@/components/common/button/IconButton";
import JoinPopup from "./JoinGroupPopup.vue";
import { mapGetters } from "vuex";
import EditGroupPopup from "@/components/common/popups/editGroupPopup/editGroupPopup.vue";
import { isOwner, isMember } from "@/utils/group"; 

export default {
  name: "GroupPopup",
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      dialog: false,
      group: undefined,
    };
  },
  components: { IconButton, JoinPopup, EditGroupPopup },
  methods: {
    open(group) {
      this.group = group;
      this.dialog = true;
    },
    onJoinClick() {
      this.dialog = false;
      this.$refs.groupJoin.open(this.group);
    },
    onInfoClick() {
      this.dialog = false;
      this.$refs.groupInfo.open(this.group);
    },
    joinGroup() {
      return !isOwner(this.group, this.user) && !isMember(this.group, this.user)
    },
    groupInfo() {
      return isOwner(this.group, this.user)
    },
  },
};
</script>

<style scoped>
#group-popup {
  padding: 20px;
  text-align: right;
}
.group-info {
  font-size: 16px;
  color: gray;
  font-weight: bold;
}
#group-name {
  margin-bottom: 10px;
}
#actions {
  direction: ltr;
}
</style>
