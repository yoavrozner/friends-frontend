import Vue from "vue";

import App from "@/App.vue";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import "@/interceptors/axios";

Vue.config.productionTip = false;

(async () => {
  await store.dispatch("authenticate");

  new Vue({
    vuetify,
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')

})();
