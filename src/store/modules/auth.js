import * as usersApi from "@/api/user";
import cookies from "js-cookie";
import { Base64 } from "js-base64";

const state = {
  token: cookies.get("kd-token") || undefined,
  user: { hierarchyFlat: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים", name: { firstName: "נטע" } },
  isApprover: false,
  isSuper: false,
};

const getters = {
  isAuthenticated: (state) => !!state.token && !!state.user,
  user: (state) => state.user,
  isApprover: (state) => state.isApprover,
  isSuper: (state) => state.isSuper,
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
    const isApprover = await usersApi.isApprover();
    commit("setIsApprover", isApprover);
  },
  async getSuperInfo({ commit }) {
    const isSuper = await usersApi.isSuper();
    commit("setIsSuper", isSuper);
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

      user.hierarchyFlat = user.hierarchy.join("/");
      user = {
        ...user,
        approverInfos: {},
      };

      commit("setUser", user);

      dispatch("getApproverInfo");
      dispatch("getSuperInfo");
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
  setIsSuper: (state, isSuper) => {
    state.isSuper = isSuper;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
