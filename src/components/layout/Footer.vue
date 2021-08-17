<template>
  <v-footer app id="header" height="86px">
    <v-spacer></v-spacer>
    <div class="fit-height">
      <img id="yesodot-logo" src="@/assets/yesodot.svg" />
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.fit-height {
  height: 100%;
  display: flex;
}
#yesodot-logo {
  width: 80px;
}
</style>
