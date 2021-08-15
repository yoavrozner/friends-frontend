<template>
  <div>
    <Header :txt="$t('searchGroup')" />
    <div id="search-container">
      <Search
        :label="$t('searchGroupLabel')"
        @search="onSearch"
        @clear="onClear"
      />
    </div>
    <div id="groups-container">
      <div v-if="securityGroups.length" class="type-container">
        <p class="type-header">{{ $t("securityGroups") }}</p>
        <div class="type-groups-container">
          <Group
            v-for="group in securityGroups"
            :key="group.id"
            :group="group"
          />
        </div>
      </div>
      <div v-if="distributionGroups.length" class="type-container">
        <p class="type-header">{{ $t("distributionGroups") }}</p>
        <div class="type-groups-container">
          <Group
            v-for="group in distributionGroups"
            :key="group.id"
            :group="group"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as groupsApi from "@/api/groups.js";

import Header from "@/components/common/Header";
import Search from "@/components/inputs/Search";
import Group from "@/components/groups/Group";

export default {
  name: "Groups",
  components: { Header, Search, Group },
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
      this.distributionGroups = groups.filter(
        (group) => group.type === "distribution"
      );
    },
    async getGroup(id) {
      const group = await groupsApi.getGroupById(id);
      return group;
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
}
.type-groups-container {
  display: flex;
  flex-wrap: wrap;
}
</style>