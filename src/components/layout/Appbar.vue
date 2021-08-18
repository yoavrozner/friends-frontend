<template>
  <v-app-bar app id="header" height="86px">
    <div class="fit-height">
      <router-link to="/home" class="auto-margin">
        <img id="friends-logo" src="@/assets/logo.svg" />
      </router-link>
    </div>
    <div v-for="page in pages" :key="page.title" class="hidden-sm-and-down">
      <NavIcon :icon="page.icon" :title="$t(`pages.${page.title}`)" :path="page.path" />
    </div>
    <v-spacer></v-spacer>
    <div class="hidden-md-and-up">
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon dark>
              mdi-format-align-justify
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="page in pages" :key="page.title" link>
            <v-list-item>
              <NavIcon :icon="page.icon" :title="$t(`pages.${page.title}`)" :path="page.path" />
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="fit-height hidden-sm-and-down">
      <div id="username">
        {{ `${$t("topbar.hello")}, ${getUserName()}` }}
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import NavIcon from "@/components/layout/NavIcon";
import { mapGetters } from "vuex";

export default {
  name: "Appbar",
  components: { NavIcon },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      pages: [
        { title: "searchGroup", icon: "mdi-magnify", path: "/" },
        { title: "createGroup", icon: "mdi-plus", path: "/create-group" },
        { title: "profile", icon: "mdi-account-outline", path: "/profile" },
        { title: "myRequests", icon: "mdi-bell-ring-outline", path: "/requests" },
      ],
    };
  },
  methods: {
    getUserName() {
      if (this.user) {
        const firstName = this.user.name.firstName || "";
        const lastName = this.user.name.lastName || "";
        return `${firstName} ${lastName}`;
      }
      return this.$t("topbar.defaultUserName");
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
