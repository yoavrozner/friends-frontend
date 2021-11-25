<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";

export default {
  name: "App",
  components: { Layout },
};
</script>

<style lang="scss">

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    font-family: Assistant;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  #background-color: #fefae0;
  #background-color: #f0f3f8;
  background-color: #fdebde;
}
</style>
