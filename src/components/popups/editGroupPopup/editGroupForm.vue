<template>
  <v-form id="form" v-model="valid">
    <FormInput
      :label="$t('group.displayName')"
      :placeholder="$t('displayNamePlaceholder')"
      :startValue="group.name"
      @input="displayName = $event"
      :readonly="!edit"
      :rules="displayNameRules"
      :reset="resetDisplayName"
    />
    <FormInput
      :label="$t('group.sAMAccountName')"
      :startValue="group.sAMAccountName"
      :readonly="!canEditGroupName() || !edit"
      :reset="resetGroupName"
    />
    <!-- todo: change owner -->
    <FormInput
      :label="$t('group.owner')"
      :placeholder="$t('ownerPlaceholder')"
      @input="displayName = $event"
      :startValue="group.owner.displayName"
      :readonly="!edit"
      :reset="resetOwnerName"
    />
    <div id="edit-group">
      <SubmitButton
        :color="edit ? 'green' : 'blue'"
        :icon="edit ? 'mdi-content-save-outline' : 'mdi-circle-edit-outline'"
        :label="edit ? $t('groups.save') : $t('groups.edit')"
        @click="edit ? onSave() : onEdit()"
        fontsize="13px"
        :disabled="edit && !valid"
      />
    </div>
    <!-- TODO: MEMBERS -->
    <hr />
    <div class="members-update">
      <Autocomplete
        icon
        background="white"
        :label="$t('membersLabel')"
        :placeholder="$t('membersPlaceholder')"
        :items="users"
        :isLoading="isLoading"
        :minLength="2"
        @select="onUserSelect"
        @type="getUsersByName"
      />
      <Chips :users="selectedUsers" @remove="onUserRemove" />
      <div id="edit-group" v-if="selectedUsers.length > 0">
        <SubmitButton
          color="blue"
          :icon="'mdi-account-plus-outline'"
          :label="$t('membersLabel')"
          @click="onMemberAdd"
          fontsize="13px"
        />
      </div>
    </div>
    <hr />
    <div class="members-update" id="members-remove">
      <Chips :users="group.members" @remove="onMemberRemove" :label="$t('group.members')" />
    </div>
  </v-form>
</template>

<script>
import * as usersApi from "@/api/user";
import * as groupApi from "@/api/group";
import Chips from "@/components/common/text/BaseChips";
import FormInput from "@/components/inputs/FormInput";
import SubmitButton from "@/components/common/button/SubmitButton";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import { isSecurityGroup } from "@/utils/group";

export default {
  name: "EditGroupForm",
  components: { FormInput, SubmitButton, Chips, Autocomplete },
  props: ["group", "reset"],
  data() {
    return {
      isLoading: false,
      users: [],
      selectedUsers: [],
      resetOwnerName: false,
      resetDisplayName: false,
      resetGroupName: false,
      edit: false,
      valid: false,
      owner: "",
      displayName: "",
      members: [],
      displayNameRules: [
        (v) => !!v || this.$t("group.create.required"),
        (v) => v.length <= 20 || this.$t("group.create.displayNameLimit"),
      ],
    };
  },
  methods: {
    onReset() {
      this.isLoading = false;
      this.users = [];
      this.selectedUsers = [];
      this.resetDisplayName = true;
      this.resetOwnerName = true;
      this.resetGroupName = true;
      this.edit = false;
      this.valid = true;
      this.owner = "";
      this.displayName = "";
      this.members = [];
    },
    onComplete() {
      const group = {
        hierarchy: this.hierarchy,
        type: this.type,
        classifaction: this.classifaction,
        displayName: this.displayName,
        members: this.members,
        approver: this.approver,
      };
      this.$emit("complete", group);
    },
    onMemberRemove(item) {
      console.log(item);
      // this.selectedUsers = this.selectedUsers.filter((user) => {
      //   return user.id !== item.id;
      // });
    },
    onMemberAdd(item) {
      // TODO: add make sure popup
      console.log(item);
    },
    onEdit() {
      this.edit = true;
    },
    canEditGroupName() {
      return isSecurityGroup(this.group);
    },
    async onSave() {
      this.edit = false;

      if (this.displayName) {
        const newName = await groupApi.updateGroupDisplayName(this.group.id, this.displayName);
        if (!newName) this.resetDisplayName = true;
      }
    },
    getUsersByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      usersApi
        .searchUsersByName(name)
        .then((users) => {
          this.users = users;
        })
        .finally(() => (this.isLoading = false));
    },
    onUserSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id)) this.remove(user);
      else this.selectedUsers.push(user);
    },
    onUserRemove(item) {
      this.selectedUsers = this.selectedUsers.filter((user) => {
        return user.id !== item.id;
      });
    },
  },
  updated() {
    this.resetDisplayName = false;
  },
  watch: {
    reset(val) {
      if (val) this.onReset();
    },
  },
};
</script>

<style scoped>
#form {
  max-width: 550px;
}
#edit-group {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
#selects-container {
  display: flex;
  justify-content: space-between;
}
#send-button {
  color: white;
  font-size: 20px;
  padding: 30px;
  margin: 30px;
}
#members-remove {
  max-width: 420px;
}
.members-update {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
