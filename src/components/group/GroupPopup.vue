<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card v-if="group" id="group-popup">
      <h2 id="group-name">{{ group.displayName }}</h2>
      <p class="group-info">
        {{ $t("groupOwner") }}: {{ group.owner.displayName }}
      </p>
      <p class="group-info">
        {{ $t("groupAttendees") }}: {{ group.attendees }}
      </p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("mail") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in group.members" :key="member.sAMAccountName">
              <td>{{ member.displayName }}</td>
              <td>{{ member.sAMAccountName }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions id="actions">
        <IconButton
          icon="mdi-account-plus"
          color="orange"
          :tooltip="$t('join')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import IconButton from "@/components/common/IconButton";

export default {
  name: "GroupPopup",
  data() {
    return {
      dialog: false,
      group: undefined,
    };
  },
  components: { IconButton },
  methods: {
    open(group) {
      this.group = group;
      this.dialog = true;
    },
    onJoin() {
      this.$emit("join", this.group.id);
      this.dialog = false;
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
  font-size: 18px;
}
#group-name {
  margin-bottom: 10px;
}
#actions {
  direction: ltr;
}
</style>