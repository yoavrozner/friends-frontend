<template>
  <div>
    <div class="flex-parent">
      <Header :txt="$t('pages.profile')" />
      <div id="icon-refresh">
        <IconButton icon="mdi-refresh" :tooltip="$t('refresh')" @click="getData()" />
      </div>
    </div>
    <ExpansionPanel :items="items" />
  </div>
</template>

<script>
import Header from "@/components/common/text/Header";
import ExpansionPanel from "@/components/profile/ProfilePanel";
import IconButton from "@/components/common/button/IconButton";

export default {
  name: "Profile",
  components: { Header, ExpansionPanel, IconButton },
  data() {
    return {
      items: this.$t("profile.tabs"),
    };
  },
  methods: {
    async getData() {
      await this.$store.dispatch("fetchMyGroups");
      this.$store.dispatch("fetchRequests");
      this.$store.dispatch("fetchOwnedGroups");
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.flex-parent {
  display: flex;
  justify-content: center;
}
#icon-refresh {
  margin-top: 45px;
  margin-right: 10px;
}
</style>
