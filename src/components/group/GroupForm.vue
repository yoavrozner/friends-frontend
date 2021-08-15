<template>
  <div id="form">
    <FormInput
      :label="$t('hierarchyLabel')"
      :placeholder="$t('hierarchyPlaceholder')"
      @input="hierarchy = $event"
    />
    <div id="selects-container">
      <Radio
        :items="[
          { label: $t('distributionGroups'), value: 'distribution' },
          { label: $t('securityGroups'), value: 'security' },
        ]"
        @change="type = $event"
      />
      <Select
        :label="$t('classifation')"
        :items="['סגול מצומצם', 'מנהלתי', 'כחול']"
        @select="classifaction = $event"
      />
    </div>
    <FormInput
      :label="$t('displayNameLabel')"
      :placeholder="$t('displayNamePlaceholder')"
      @input="displayName = $event"
    />
    <FormInput
      :label="$t('membersLabel')"
      :placeholder="$t('membersPlaceholder')"
      @input="members = $event"
    />
    <FormInput
      :label="$t('approverLabel')"
      :placeholder="$t('approverPlaceholder')"
      @input="approver = $event"
    />

    <div id="attention-container">
      {{ $t("attention") }} <b>{{ $t("think") }}</b>
    </div>

    <v-btn
      id="send-button"
      depressed
      color="#2c3448"
      @click="onComplete"
    >
      {{ $t("send") }}
    </v-btn>
  </div>
</template>

<script>
import FormInput from "@/components/inputs/FormInput";
import Select from "@/components/inputs/Select";
import Radio from "@/components/inputs/Radio";

export default {
  name: "GroupForm",
  components: { FormInput, Select, Radio },
  data() {
    return {
      hierarchy: "",
      type: undefined,
      classifaction: undefined,
      displayName: "",
      members: [],
      approver: "",
    };
  },
  methods: {
    onComplete() {
      const group =  {
        hierarchy: this.hierarchy,
        type: this.type,
        classifaction: this.classifaction,
        displayName: this.displayName,
        members: this.members,
        approver: this.approver,
      };
      this.$emit('complete', group)
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