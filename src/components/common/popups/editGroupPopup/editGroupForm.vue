<template>
  <div>
    <v-form id="form" v-model="valid">
      <FormInput
        :label="$t('group.displayName')"
        :placeholder="$t('displayNamePlaceholder')"
        :startValue="group.displayName"
        @input="displayName = $event"
        :readonly="!edit"
        :rules="displayNameRules"
        :reset="resetDisplayName"
      />
      <!-- This should be the FRDIS instead of actual. -->
      <!-- Remains to be seen if the user should be able to change -->
      <FormInput
        :label="$t('group.sAMAccountName')"
        :placeholder="$t('namePlaceholder')"
        :startValue="group.name"
        :readonly="!canEditGroupName() || !edit"
        :reset="resetGroupName"
      />
      <Autocomplete
        icon
        background="white"
        :label="$t('group.owner')"
        :placeholder="$t('ownerPlaceholder')"
        :items="users"
        :isLoading="isLoading"
        :minLength="2"
        @select="onOwnerSelect"
        @type="getUsersByName"
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
        <Chips
          :users="group.members"
          @remove="onMemberRemove"
          :label="$t('group.members')"
        />
      </div>
    </v-form>
    <NotePopup
      ref="notePopup"
      @complete="onMemberAddComplete"
      :note="$t('notes.member')"
    />
  </div>
</template>

<script>
// import * as joinApi from "@/api/join";
import * as usersApi from "@/api/user";
import * as groupApi from "@/api/group";
import debounce from "lodash/debounce";
import Chips from "@/components/common/text/BaseChips";
import FormInput from "@/components/common/inputs/FormInput";
import SubmitButton from "@/components/common/button/SubmitButton";
import Autocomplete from "@/components/common/inputs/BaseAutocomplete";
import NotePopup from "@/components/common/popups/NotePopup.vue";

import { isSecurityGroup } from "@/utils/group";
import { ClassificationTypeSuffixGroupName } from "@/utils/classification";
import { GroupTypeSuffixGroupName } from "@/utils/group";
import { mapGetters } from "vuex";

export default {
  name: "EditGroupForm",
  components: { FormInput, SubmitButton, Chips, Autocomplete, NotePopup },
  props: ["group", "reset"],
  computed: {
    ...mapGetters(["limitDisplayName", "minLimitGroupName"]),
  },
  data() {
    return {
      displayName: "",
      prefixGroupName: "",
      groupName: "",
      isGroupNameValid: true,
      isLoading: false,
      users: [],
      selectedUsers: [],
      resetOwnerName: false,
      resetDisplayName: false,
      resetGroupName: false,
      edit: false,
      valid: false,
      owner: "",
      members: [],
      requiredRules: [(v) => !!v || this.$t("group.create.required")],
      displayNameRules: [
        (v) => !!v || this.$t("group.create.required"),
        (v) =>
          v.split('/')[v.split('/').length - 1].length <= this.limitDisplayName ||
          this.$t("group.create.displayNameLimit"),
      ],
    };
  },
  methods: {
    onInputGroupName: debounce(async function () {
      if (
        typeof this.prefixGroupName === "string" &&
        this.prefixGroupName.length >= this.minLimitGroupName
      ) {
        const group = await groupApi.getGroupById(this.groupName);
        group.sAMAccountName === this.groupName
          ? (this.isGroupNameValid = false)
          : (this.isGroupNameValid = true);
      }
    }, 100),
    getGroupName() {
      this.groupName = `${
        this.prefixGroupName
      }_${ClassificationTypeSuffixGroupName(
        this.group.classification
      )}_${GroupTypeSuffixGroupName(this.group.type)}`;
    },
    checkValidation() {
      return this.isGroupNameValid
        ? null
        : this.$t("group.create.groupNameAlreadyExists");
    },
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
      groupApi.deleteGroupMember(this.group.id, item.sAMAccountName);
    },
    onMemberAdd(item) {
      this.$refs.notePopup.open(item);
    },
    onMemberAddComplete(request) {
      console.log("onMemberAddComplete ", request);
      groupApi.addGroupMember(this.group.id, this.selectedUsers);
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
        const newName = await groupApi.updateGroupDisplayName(
          this.group.id,
          this.displayName
        );
        if (!newName) this.resetDisplayName = true;
      }

      if (this.prefixGroupName) {
        const newName = await groupApi.updateGroupName(
          this.group.id,
          this.prefixGroupName
        );
        if (!newName) this.resetGroupName = true;
      }

      if (this.owner) {
        const newOwner = await groupApi.updateGroupOwner(
          this.group.id,
          this.owner
        );
        if (!newOwner) this.resetOwnerName = true;
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
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onUserSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id))
        this.remove(user);
      else this.selectedUsers.push(user.sAMAccountName);
    },
    onOwnerSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id))
        this.remove(user);
      else this.owner = user.sAMAccountName;
    },
    onUserRemove(item) {
      this.selectedUsers = this.selectedUsers.filter((user) => {
        return user.id !== item.id;
      });
    },
  },
  updated() {
    this.resetDisplayName = false;
    this.resetGroupName = true;
  },
  watch: {
    reset(val) {
      if (val) this.onReset();
    },
    prefixGroupName() {
      this.getGroupName();
      this.onInputGroupName();
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
