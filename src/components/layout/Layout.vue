<template>
  <v-app>
    <Appbar />
    <v-main>
      <slot />
    </v-main>
    <Footer />

    <ErrorSnackbar />
  </v-app>
</template>

<script>
import Appbar from "@/components/layout/Appbar.vue";
import Footer from "@/components/layout/Footer.vue";
import ErrorSnackbar from "@/components/popups/ErrorSnackBar";

export default {
  name: "Layout",
  components: { Appbar, Footer, ErrorSnackbar },
};
</script>

<style scoped></style>
