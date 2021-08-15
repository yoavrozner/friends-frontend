<template>
  <div>
    <h1 id="header">{{ $t("welcome") }}</h1>
    <div id="links-container"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
#header {
  margin-top: 30px;
  font-size: 40px;
}
#links-container {
  display: grid;
}
</style>