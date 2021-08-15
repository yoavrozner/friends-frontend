<template>
  <v-app-bar app id="header" height="86px">
    <div id="logo">
      <router-link to="/" class="auto-margin">
        <img id="icon" src="@/assets/logo.svg" />
      </router-link>
    </div>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
#header {
  background-color: white;
}
#logo {
  height: 100%;
}
#icon {
  width: 300px;
  height: 100%;
  display: flex;
}
</style>