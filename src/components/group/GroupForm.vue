<template>
  <v-form id="form" v-model="valid">
    <FormInput
      :label="$t('hierarchyLabel')"
      :placeholder="$t('hierarchyPlaceholder')"
      @input="hierarchy = $event"
      :required="true"
      :rules="requiredRules"
      :readonly="true"
      :solo="false"
      :filled="true"
    />
    <div id="selects-container">
      <Radio :items="groupTypes" @change="type = $event" :rules="requiredRules" />
      <Select
        :label="$t('group.classification.title')"
        :items="classificationTypes"
        @select="classifaction = $event"
        :rules="requiredRules"
      />
    </div>
    <FormInput
      :label="$t('group.displayName')"
      :placeholder="$t('displayNamePlaceholder')"
      @input="displayName = $event"
      :required="true"
      :rules="displayNameRules"
      :prefix="hierarchy + '/'"
    />

    <div id="add-members">
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
        :validation="checkValidationMembers"
      />
      <Chips :users="selectedUsers" @remove="onUserRemove" />
    </div>

    <div v-if="!isApprover" id="approver">
      <Autocomplete
        icon
        background="white"
        :label="$t('approverLabel')"
        :placeholder="$t('approverPlaceholder')"
        :items="approvers"
        :minLength="2"
        :isLoading="isLoading"
        @select="onApproverSelect"
        @type="getApproversByName"
      />
      <Chips :users="selectedApprovals" @remove="onApprovalRemove" />
    </div>

    <div id="attention-container">
      {{ $t("attention") }} <b>{{ $t("think") }}</b>
    </div>

    <SubmitButton
      id="send-button"
      color="#2c3448"
      :label="$t('send')"
      :disabled="!valid || checkValidationMembers() != null"
      @click="onComplete"
    />
  </v-form>
</template>

<script>
import * as usersApi from "@/api/user";
import Chips from "@/components/common/text/BaseChips";
import FormInput from "@/components/inputs/FormInput";
import Select from "@/components/inputs/Select";
import Radio from "@/components/inputs/Radio";
import SubmitButton from "@/components/common/button/SubmitButton";
import Autocomplete from "@/components/inputs/BaseAutocomplete";

import { mapGetters } from "vuex";
import { GroupTypeEnum } from "@/utils/group";
import { getUserLimitMembers } from "@/utils/user";

export default {
  name: "GroupForm",
  components: { FormInput, Select, Radio, SubmitButton, Autocomplete, Chips },
  computed: {
    ...mapGetters(["isApprover", "user"]),
  },
  data() {
    return {
      isLoading: false,
      users: [],
      selectedUsers: [],
      approvers: [],
      selectedApprovals: [],
      hierarchy: "",
      groupTypes: [
        { label: this.$t("distributionGroups"), value: GroupTypeEnum.distribution },
        { label: this.$t("securityGroups"), value: GroupTypeEnum.secuirty },
      ],
      classificationTypes: Object.values(this.$t("group.classification.options")),
      type: undefined,
      classifaction: undefined,
      displayName: "",
      valid: false,
      requiredRules: [(v) => !!v || this.$t("group.create.required")],
      displayNameRules: [
        (v) => !!v || this.$t("group.create.required"),
        (v) => v.length <= 20 || this.$t("group.create.displayNameLimit"),
      ],
    };
  },
  methods: {
    checkValidationMembers() {
      const limit = getUserLimitMembers();
      return this.selectedUsers.length > limit ? this.$t("group.create.MembersLimit", { limit: limit }) : null;
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
    getApproversByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      usersApi
        .searchApproverByName(name)
        .then((approvers) => {
          this.approvers = approvers;
        })
        .finally(() => (this.isLoading = false));
    },
    onUserSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id)) this.remove(user);
      else this.selectedUsers.push(user);
    },
    onApproverSelect(approver) {
      this.approvers = [];
      if (!approver) return;
      else if (this.isUserExists(this.selectedApprovals, approver.id)) this.remove(approver);
      this.selectedApprovals = [approver];
    },
    onUserRemove(item) {
      this.selectedUsers = this.selectedUsers.filter((user) => {
        return user.id !== item.id;
      });
    },
    onApprovalRemove(item) {
      this.selectedApprovals = this.selectedApprovals.filter((user) => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onComplete() {
      const group = {
        hierarchy: this.hierarchy,
        type: this.type,
        classifaction: this.classifaction,
        displayName: `${this.hierarchy}/${this.displayName}`,
        members: this.members,
        approver: this.isApprover ? this.user.id : this.approver,
      };

      this.$emit("complete", group);
    },
  },
};
</script>

<style scoped>
#form {
  margin: 30px 200px;
}
#selects-container {
  display: flex;
  justify-content: space-between;
}
#attention-container {
  border: 1px solid black;
  color: red;
  font-size: 18px;
  margin: auto;
  width: 400px;
  padding: 10px;
}
#send-button {
  color: white;
  font-size: 20px;
  padding: 30px;
  margin: 30px;
}
</style>
