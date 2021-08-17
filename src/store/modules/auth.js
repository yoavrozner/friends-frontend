import * as usersApi from "@/api/user";
import cookies from "js-cookie";
import { Base64 } from "js-base64";

const state = {
  token: cookies.get("kd-token") || undefined,
  user: undefined,
  isApprover: false,
};

const getters = {
  isAuthenticated: (state) => !!state.token && !!state.user,
  user: (state) => state.user,
  isApprover: (state) => state.isApprover,
};

const actions = {
  async authenticate({ rootState, dispatch }) {
    if (state.token) {
      await dispatch("parseToken");
    } else if (rootState.configuration.authUrl) {
      window.location.replace(rootState.configuration.authUrl);
    } else {
      return;
    }
  },
  logout({ commit }) {
    cookies.remove("kd-token");
    commit("setToken", undefined);
  },
  async getApproverInfo({ commit }) {
    await usersApi.isApprover().then((isApprover) => {
      console.log("isApprover", isApprover);
      commit("setIsApprover", isApprover);
    });
  },
  async parseToken({ commit, dispatch }) {
    try {
      const token = state.token;
      const parts = token.split(".");

      if (parts.length !== 3) {
        dispatch("logout");
        throw new Error("token malformed");
      }

      let user = JSON.parse(Base64.decode(parts[1]));

      if (Math.round(new Date().getTime() / 1000) > user.exp) {
        dispatch("logout");
        throw new Error("token expired");
      }

      user = {
        ...user,
        approverInfos: {},
      };

      commit("setUser", user);
      dispatch("getApproverInfo", user);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setToken: (state) => (state.token = cookies.get("kd-token")),
  setUser: (state, user) => {
    state.user = user;
  },
  setIsApprover: (state, isApprover) => {
    state.isApprover = isApprover;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
