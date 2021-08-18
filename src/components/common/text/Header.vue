<template>
  <h1 id="header">{{ txt }}</h1>
</template>

<script>
export default {
  name: "Header",
  props: ["txt"],
};
</script>

<style scoped>
#header {
  margin-top: 30px;
  font-size: 40px;
}
</style>