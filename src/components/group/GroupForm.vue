<template>
  <v-form id="form" v-model="valid">
    <FormInput :label="$t('hierarchyLabel')" :startValue="user.hierarchyFlat" :readonly="true" :solo="false" :filled="true" />
    <div id="selects-container">
      <Radio class="child" :items="groupTypes" @change="type = $event" :rules="requiredRules" />
      <Select :label="$t('group.classification.title')" :items="classificationTypes" @select="classification = $event" :rules="requiredRules"
      />
    </div>
    <FormInput :label="$t('group.displayName')" :placeholder="$t('displayNamePlaceholder')" :required="true" :maxlength="limitDisplayName"
      :rules="displayNameRules" :prefix="user.hierarchyFlat + '/'" @input="displayName = $event" />
    <div v-if="type && isSecurityGroup()" id="groupName">
      <FormInput :label="$t('group.sAMAccountName')" :placeholder="$t('groupNamePlaceholder')" @input="prefixGroupName = $event"
        :inputChecker="true" :required="true" :rules="requiredRules" :hint="groupName" restrictPattern="^[a-zA-Z0-9_]*$" :validator="checkValidation"
        :error="!isGroupNameValid" />
    </div>
    <div id="add-members">
      <Autocomplete icon background="white" :label="$t('membersLabel')" :placeholder="$t('membersPlaceholder')" :items="users"
        :isLoading="isUsersLoading" :minLength="2" @select="onUserSelect" @type="getUsersByName" :validation="checkValidationMembers"
        :disabled="checkValidationMembers() != null" :error="checkValidationMembers() != null" />
      <Chips :users="selectedUsers" @remove="onUserRemove" />
    </div>

    <div v-if="!isApprover && !isSuper" id="approver">
      <Autocomplete icon background="white" :label="$t('approverLabel')" :placeholder="isApproverDisabled() ? $t('pleaseChooseGroupType') : $t('approverPlaceholder')" :items="approvers"
        :minLength="2" :isLoading="isApproversLoading" @select="onApproverSelect" @type="getApproversByName" :disabled="isApproverDisabled()"/>
      <Chips :users="selectedApprovals" @remove="onApprovalRemove" />
    </div>

    <div id="attention-container">
      {{ $t("attention") }} <b>{{ $t("think") }}</b>
    </div>

    <SubmitButton id="send-button" color="#2c3448" :label="$t('send')" :disabled="isCompleteDisabled()"
      @click="onComplete" />
  </v-form>
</template>

<script>
import * as usersApi from "@/api/user";
import * as groupApi from "@/api/group";
import debounce from "lodash/debounce";

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
    ...mapGetters(["isApprover", "isSuper", "user", "limitDisplayName", "minLimitGroupName"]),
  },
  data() {
    return {
      isUsersLoading: false,
      isApproversLoading: false,
      users: [],
      selectedUsers: [],
      approvers: [],
      selectedApprovals: [],
      hierarchy: "",
      groupTypes: [
        { label: this.$t("distributionGroups.name"), value: GroupTypeEnum.distribution },
        // If you want to return security group just cancel the comment on this line.
        // { label: this.$t("securityGroups.name"), value: GroupTypeEnum.security },
      ],
      classificationTypes: Object.values(this.$t("group.classification.options")),
      type: undefined,
      classification: undefined,
      displayName: "",
      prefixGroupName: "",
      groupName: "",
      isGroupNameValid: true,
      valid: false,
      requiredRules: [(v) => !!v || this.$t("group.create.required")],
      displayNameRules: [
        (v) => !!v || this.$t("group.create.required"),
        (v) => v && v.length <= this.limitDisplayName || this.$t("group.create.displayNameLimit"),
      ],
    };
  },
  watch: {
    type() {
      this.isGroupNameValid = true;
      this.prefixGroupName = "";
      this.getGroupName();
      this.onInputGroupName();
    },
    classification() {
      this.getGroupName();
      this.onInputGroupName();
    },
    prefixGroupName() {
      this.getGroupName();
      this.onInputGroupName();
    },
  },
  methods: {
    isCompleteDisabled() {
    console.log('isCompleteDisabled')
    console.log(this.valid , this.checkValidationMembers() , this.isGroupNameValid)
    console.log('selectedApprovals: ',this.selectedApprovals);
      return !this.valid || this.checkValidationMembers() != null || !this.isGroupNameValid || (!this.isApprover && this.selectedApprovals.length===0) ;
    },
    checkValidation() {
      return this.isGroupNameValid ? null : this.$t("group.create.groupNameAlreadyExists");
    },
    isApproverDisabled() {
      return !this.type;
    },
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
      return this.selectedUsers && this.selectedUsers.length >= limit ? this.$t("group.create.MembersLimit", { limit: limit }) : null;
    },
    onInputGroupName: debounce(async function() {
      if (
        typeof this.groupName === "string" &&
        this.groupName &&
        this.groupName.length >= this.minLimitGroupName &&
        this.classification &&
        this.type
      ) {
        const group = await groupApi.getGroupById(this.groupName);
        group && group.sAMAccountName && this.groupName && group.sAMAccountName === this.groupName ? (this.isGroupNameValid = false) : (this.isGroupNameValid = true);
      }
    }, 100),
    getUsersByName(name) {
      if (this.isUsersLoading) return;
      this.isUsersLoading = true;
      usersApi
        .searchUsersByName(name)
        .then((users) => {
          this.users = users;
        })
        .finally(() => (this.isUsersLoading = false));
    },
    async getApproversByName(name) {
      if (this.isApproversLoading) return;
      this.isApproversLoading = true;
      try{
        const approversByName = await usersApi.searchApproverByName(this.isSecurityGroup() ? "security": "distribution", name);
        this.approvers = approversByName;
        console.log('user.api return', approversByName);
        console.log("this.approvers", this.approvers);
      } catch(err){
        console.error('error getting approver by name', err);
        throw new Error(err);
      } finally{
        this.isApproversLoading = false;
      }
    },
    onUserSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id)) this.remove(user);
      else this.selectedUsers.push(user);
    },
    onApproverSelect(approver) {
      console.log("#########################################################")
      console.log(this.valid)
      console.log(this.checkValidationMembers())
      console.log(this.isGroupNameValid)
      console.log(this.selectedApprovals)
      console.log(this.approvers)
      console.log(approver)
      console.log("#########################################################")
      
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
      const groupDisplayName = this.hierarchy ? `${this.hierarchy}/${this.displayName}` : this.displayName;
      const group = {
        hierarchy: this.hierarchy,
        type: this.type,
        classification: this.classification,
        displayName: groupDisplayName,
        members: this.selectedUsers.map(member => member.id),
        approver: (this.isApprover || this.isSuper) ? this.user.id : this.selectedApprovals[0].id,
      };

      if (this.isSecurityGroup()) {
        group.groupName = this.groupName;
      }

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
    padding: 0px;
    margin: 30px;
    height: 50px;
    width: 100px;
  }
  
  .child {
    flex: 1;
    margin-right: 220px;
  }
</style>