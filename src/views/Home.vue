<template>
  <div>
    <Header :txt="$t('welcome')" />
    <div id="links-container">
      <LinkButton color="#9AB6EA" path="/profile" :txt="$t('pages.profile')" />
      <LinkButton color="#B5DE99" path="/" :txt="$t('pages.searchGroup')" />
      <LinkButton color="#FFBD8D" path="/requests" :txt="$t('pages.myRequests')" />
      <LinkButton color="#FFE66F" path="/create-group" :txt="$t('pages.createGroup')" />
    </div>
  </div>
</template>

<script>
import LinkButton from "@/components/common/button/LinkButton";
import Header from "@/components/common/text/Header";

export default {
  name: "Home",
  components: { LinkButton, Header },
};
</script>

<style scoped>
#links-container {
  display: grid;
  padding: 100px;
  column-gap: 30px;
  row-gap: 30px;
  justify-content: center;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
}
</style>
