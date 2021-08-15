<template>
  <v-app-bar app id="header" height="86px">
    <div class="fit-height">
      <router-link to="/" class="auto-margin">
        <img id="friends-logo" src="@/assets/logo.svg" />
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="fit-height">
      <div id="username">
        {{ `${$t("hello")}, ${getUserName()}` }}
      </div>
      <img id="yesodot-logo" src="@/assets/yesodot.svg" />
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Appbar",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    getUserName() {
      if (this.user) {
        const firstName = this.user.name.firstName || "";
        const lastName = this.user.name.lastName || "";
        return `${firstName} ${lastName}`;
      }
      return this.$t("defaultUserName");
    },
  },
};
</script>

<style scoped>
.fit-height {
  height: 100%;
  display: flex;
}
#header {
  background-color: white;
  justify-content: space-between;
}
#friends-logo {
  width: 300px;
  height: 100%;
  display: flex;
}
#yesodot-logo {
  width: 80px;
}
#username {
  font-size: 20px;
  margin: auto;
  margin-left: 25px;
  font-weight: 600;
}
</style>