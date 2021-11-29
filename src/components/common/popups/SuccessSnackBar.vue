<template>
  <v-snackbar   v-model="open" bottom  color="green">
    <div class="flex">
      <div id="snack-bar">
      <v-icon id="block" color="white">check-circle</v-icon>
        <p v-if="checkAuth()">הקבוצה נוצרה בהצלחה</p>
        <p v-else>הקבוצה מחכה לאישור</p>
      </div>
    </div>
  </v-snackbar>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  name: "SuccessSnackbar",
  computed: {
    ...mapGetters(["success","isApprover","isSuper"]),
  },
  data() {
    return {
      open: false,
    };
  },
 watch: {
    success: function(val) {
      console.log("val",val)
      if (val) this.open = true;
      setTimeout(()=>{store.dispatch('onSuccess', false);},3000)
    },
  },
  methods: {
    checkAuth() {
      return this.isApprover || this.isSuper;
    }
  }
};
</script>

<style scoped>
#block {
  font-size: 40px;
  margin-left: 10px;
}
#snack-bar {
margin:auto;
text-align:center;
}
</style>
