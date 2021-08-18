<template>
  <div>
    <Header :txt="$t('pages.searchGroup')" />
    <div id="search-container">
      <Search :label="$t('groups.searchGroupLabel')" @search="onSearch" @clear="onClear" />
    </div>
    <div id="groups-container">
      <div v-if="securityGroups.length" class="type-container">
        <p class="type-header">{{ $t("securityGroups.name") }}</p>
        <div class="type-groups-container">
          <Group v-for="group in securityGroups" :key="group.id" :group="group" @click="onGroupClick" />
        </div>
      </div>
      <div v-if="distributionGroups.length" class="type-container">
        <p class="type-header">{{ $t("distributionGroups.name") }}</p>
        <div class="type-groups-container">
          <Group v-for="group in distributionGroups" :key="group.id" :group="group" @click="onGroupClick" />
        </div>
      </div>
    </div>
    <GroupPopup ref="groupDetails" />
  </div>
</template>

<script>
import * as groupsApi from "@/api/group";

import Header from "@/components/common/text/Header";
import Search from "@/components/common/inputs/Search";
import GroupPopup from "@/components/group/GroupPopup";
import Group from "@/components/group/Group";

export default {
  name: "Groups",
  components: { Header, Search, Group, GroupPopup },
  data() {
    return {
      securityGroups: [],
      distributionGroups: [],
    };
  },
  methods: {
    async onSearch(value) {
      const groups = await groupsApi.searchGroups(value);
      this.securityGroups = groups.filter((group) => group.type === "security");
      this.distributionGroups = groups.filter((group) => group.type === "distribution");
    },
    async getGroup(id) {
      const group = await groupsApi.getGroupById(id);
      return group;
    },
    async onGroupClick(id) {
      const group = await this.getGroup(id);
      this.$refs.groupDetails.open(group);
    },
    onClear() {
      this.securityGroups = [];
      this.distributionGroups = [];
    },
  },
};
</script>

<style scoped>
#search-container {
  margin: 30px 200px;
}
#groups-container {
  margin: 0 100px;
}
.type-container {
  margin-bottom: 30px;
}
.type-header {
  font-size: 25px;
  text-align: right;
  padding: 5px;
}
.type-groups-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
