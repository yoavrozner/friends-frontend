<template>
  <v-footer id="footer" height="86px">
    <v-spacer></v-spacer>
    <div class="fit-height">
      <img id="yesodot-logo" src="@/assets/yesodot.svg" />
      <img id="sapir-logo" src="@/assets/sapirlogo.svg" />
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
#footer {
  margin-left: 60px;
  background-color: #fdebde;
}
.fit-height {
  height: 100%;
  display: flex;
}
#yesodot-logo {
  opacity: 0.8;
  width: 80px;
  margin-left: 30px;
  margin-bottom: 10px;
}
#sapir-logo {
  opacity: 0.8;
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
