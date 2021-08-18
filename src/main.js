import Vue from "vue";

import { isAlive } from "@/api/healthcheck";

import App from "@/App.vue";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

(async () => {
    if (await isAlive()) {
        await store.dispatch("authenticate");
    } else if (window.location.pathname !== "/503") {
        window.location.replace("/503")
    }

    new Vue({
      vuetify,
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app')

})();