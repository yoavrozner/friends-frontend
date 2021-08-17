<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="6" sort-by="createdAt" sort-desc class="elevation-1">
    <template v-slot:item.status="{ item }">
      <v-chip :color="statusColor(item.status)" dark>
        {{ statusText(item.status) }}
      </v-chip>
    </template>
    <template v-slot:item.type="{ item }">
      {{ groupTypeText(item.type) }}
    </template>
    <template v-slot:item.reqType="{ item }">
      {{ requestTypeText(item.reqType) }}
    </template>
    <template v-slot:item.classification="{ item }">
      <div v-bind:style="{ color: classificationTypeColor(item.classification) }">
        {{ classificationTypeText(item.classification) }}
      </div>
    </template>
    <template v-slot:item.displayName="{ item }">
      <BaseTooltip :value="item.displayName" />
    </template>
    <template v-slot:item.sAMAccountName="{ item }">
      <BaseTooltip :value="item.sAMAccountName" />
    </template>
    <template v-slot:item.edit="{ item }">
      <SubmitButton :item="item" label="פרטים נוספים" color="#00b0f0" fontsize="14px" @click="$emit('edit', item)" />
    </template>
  </v-data-table>
</template>

<script>
import SubmitButton from "@/components/common/button/SubmitButton";
import BaseTooltip from "@/components/common/text/BaseToolTip";

import { StatusValueToColor, StatusValueToText } from "@/utils/status";
import { GroupTypeValueToText } from "@/utils/group";
import { RequestTypeValueToText } from "@/utils/request";
import { ClassificationTypeValueToText, ClassificationTypeValueToColor } from "@/utils/classification";

export default {
  name: "Header",
  props: ["headers", "items"],
  components: { SubmitButton, BaseTooltip },
  data() {
    return {};
  },
  methods: {
    statusColor(status) {
      return StatusValueToColor(status);
    },
    statusText(status) {
      return StatusValueToText(status);
    },
    groupTypeText(group) {
      return GroupTypeValueToText(group);
    },
    requestTypeText(request) {
      return RequestTypeValueToText(request);
    },
    classificationTypeText(classification) {
      return ClassificationTypeValueToText(classification);
    },
    classificationTypeColor(classification) {
      return ClassificationTypeValueToColor(classification);
    },
  },
};
</script>

<style scoped></style>
