<template>
  <v-btn id="btn" :color="color" @click="onClick"> {{ txt }} </v-btn>
</template>

<script>
export default {
  name: "LinkButton",
  props: ["color", "path", "txt"],
  methods: {
    onClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
#btn {
  width: 400px;
  height: 150px;
  font-size: 30px;
  color: white;
}
</style>