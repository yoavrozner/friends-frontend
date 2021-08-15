<template>
  <div>
    <Header :txt="$t('searchGroup')" />
    <div id="search-container">
      <Search :label="$t('searchGroupLabel')" @enter="onEnter" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Search from "@/components/inputs/Search";

export default {
  name: "Groups",
  components: { Header, Search },
  methods: {
    onEnter(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
#search-container {
  margin: 30px 200px;
}
</style>