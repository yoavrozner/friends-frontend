<template>
  <v-app>
    <Appbar />
    <v-main>
      <slot />
    </v-main>
    <Footer />
    <ErrorSnackbar />
    <SuccessSnackbar />
  </v-app>
</template>

<script>
import Appbar from "@/components/layout/Appbar.vue";
import Footer from "@/components/layout/Footer.vue";
import ErrorSnackbar from "@/components/common/popups/ErrorSnackBar";
import SuccessSnackbar from "@/components/common/popups/SuccessSnackBar";

export default {
  name: "Layout",
  components: { Appbar, Footer, ErrorSnackbar, SuccessSnackbar },
};
</script>

<style scoped></style>
