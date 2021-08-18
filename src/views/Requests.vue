<template>
  <div>
    <div class="flex-parent">
      <Header :txt="$t('pages.myRequests')" />
      <div id="icon-refresh">
        <IconButton icon="mdi-refresh" :tooltip="$t('refresh')" @click="getData()" />
      </div>
    </div>
    <ExpansionPanel :items="items" />
  </div>
</template>

<script>
import Header from "@/components/common/text/Header";
import ExpansionPanel from "@/components/request/RequestPanel";
import IconButton from "@/components/common/button/IconButton";

export default {
  name: "Requests",
  components: { Header, ExpansionPanel, IconButton },
  data() {
    return {
      items: this.$t("request.tabs"),
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("fetchRequestsApprover");
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
