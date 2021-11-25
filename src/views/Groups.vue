<template>
  <div>
    <Header :txt="$t('pages.searchGroup')" />
    <div id="search-container">
      <Search :label="$t('groups.searchGroupLabel')" @search="onSearch" @clear="onClear" />
    </div>
    <div v-if="isLoading" class="loader"></div>
    <p style="text-align:center" class="type-header" v-if="!isGroupExist">{{ $t("noGroups")}}</p>
    <div id="groups-container">
      <div v-if="securityGroups.length" class="type-container">
        <div>
          <p class="type-header">{{ $t("securityGroups.name") }}</p>
    
        </div>
        <div class="type-groups-container">
          <Group v-for="group in securityGroups" :key="group.id" :group="group" @click="onGroupClick(group.id)" />
        </div>
      </div>
      <div v-if="distributionGroups.length" class="type-container">
        <div>
          <p class="type-header">{{ $t("distributionGroups.name") }}</p>
          
        </div>
        <div class="type-groups-container">
          <Group v-for="group in distributionGroups" :key="group.id" :group="group" @click="onGroupClick(group.id)" />
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
      isLoading: false,
      isGroupExist: true,
    };
  },
  methods: {
    async onSearch(value) {
      this.securityGroups = [];
      this.distributionGroups = [];
      this.isLoading = true;
      this.isGroupExist = true;
      try {
        const groups = await groupsApi.searchGroups(value);
        if (groups.length == 0) this.isGroupExist = false;
        this.isLoading = false;
        this.securityGroups = groups.filter((group) => group.type.toLowerCase().indexOf("security") !== -1);
        this.distributionGroups = groups.filter((group) => group.type.toLowerCase().indexOf("distribution") !== -1);
      } catch (err) {
        this.isLoading = false;
        this.isGroupExist = false;
      }

    },
    async getGroup(id) {
      const group = await groupsApi.getGroupById(id);
      return group;
    },
    async onGroupClick(id) {
      console.log(id);
      const group = await this.getGroup(id);
      console.log(group)
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

  .loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #433E3F;
    width: 50px;
    height: 50px;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
    margin: auto;
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>