<template>
  <v-form id="form" v-model="valid">
    <FormInput
      :label="$t('hierarchyLabel')"
      :startValue="user.hierarchyFlat"
      :readonly="true"
      :solo="false"
      :filled="true"
    />
    <div id="selects-container">
      <Radio class="child" :items="groupTypes" @change="type = $event" :rules="requiredRules" />
      <Select
        :label="$t('group.classification.title')"
        :items="classificationTypes"
        @select="classification = $event"
        :rules="requiredRules"
      />
    </div>
    <FormInput
      :label="$t('group.displayName')"
      :placeholder="$t('displayNamePlaceholder')"
      :required="true"
      :maxlength="limitDisplayName"
      :rules="displayNameRules"
      :prefix="user.hierarchyFlat + '/'"
      @input="displayName = $event"
    />
    <div v-if="type && isSecurityGroup()" id="groupName">
      <FormInput
        :label="$t('group.sAMAccountName')"
        :placeholder="$t('groupNamePlaceholder')"
        @input="prefixGroupName = $event"
        :required="true"
        :rules="requiredRules"
        :hint="groupName"
        restrictPattern="^[a-zA-Z0-9_]*$"
      />
    </div>
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

    <div v-if="!isApprover && !isSuper" id="approver">
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
import FormInput from "@/components/common/inputs/FormInput";
import Select from "@/components/common/inputs/Select";
import Radio from "@/components/common/inputs/Radio";
import SubmitButton from "@/components/common/button/SubmitButton";
import Autocomplete from "@/components/common/inputs/BaseAutocomplete";

import { mapGetters } from "vuex";
import { ClassificationTypeSuffixGroupName } from "@/utils/classification";
import { GroupTypeEnum, GroupTypeSuffixGroupName } from "@/utils/group";
import { getUserLimitMembers } from "@/utils/user";

export default {
  name: "GroupForm",
  components: { FormInput, Select, Radio, SubmitButton, Autocomplete, Chips },
  computed: {
    ...mapGetters(["isApprover", "isSuper", "user", "limitDisplayName"]),
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
        { label: this.$t("distributionGroups.name"), value: GroupTypeEnum.distribution },
        { label: this.$t("securityGroups.name"), value: GroupTypeEnum.security },
      ],
      classificationTypes: Object.values(this.$t("group.classification.options")),
      type: undefined,
      classification: undefined,
      displayName: "",
      prefixGroupName: "",
      groupName: "",
      valid: false,
      requiredRules: [(v) => !!v || this.$t("group.create.required")],
      displayNameRules: [
        (v) => !!v || this.$t("group.create.required"),
        (v) => v.length <= this.limitDisplayName || this.$t("group.create.displayNameLimit"),
      ],
    };
  },
  watch: {
    type() {
      this.getGroupName();
    },
    classification() {
      this.getGroupName();
    },
    prefixGroupName() {
      this.getGroupName();
    },
  },
  methods: {
    isSecurityGroup() {
      return this.type === GroupTypeEnum.security;
    },
    getGroupName() {
      this.groupName = `${this.prefixGroupName}_${ClassificationTypeSuffixGroupName(
        this.classification
      )}_${GroupTypeSuffixGroupName(this.type)}`;
    },
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
      this.selectedUsers = this.selectedUsers.filter((user) => user.id !== item.id);
    },
    onApprovalRemove(item) {
      this.selectedApprovals = this.selectedApprovals.filter((user) => user.id !== item.id);
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onComplete() {
      const group = {
        hierarchy: this.hierarchy,
        type: this.type,
        classification: this.classification,
        displayName: `${this.hierarchy}/${this.displayName}`,
        members: this.members,
        approver: this.isApprover || this.isSuper ? this.user.id : this.approver,
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
  justify-content: center;
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
.child {
  flex: 1;
  margin-right: 220px;
}
</style>
