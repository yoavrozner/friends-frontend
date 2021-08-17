import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import dictionary from "./modules/dictionary";
import error from "./modules/error";
import join from "./modules/join";
import create from "./modules/create";
import owner from "./modules/owner";
import group from "./modules/group";
import request from "./modules/request";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dictionary,
    error,
    join,
    create,
    owner,
    group,
    request,
  },
});
