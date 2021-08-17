import * as joinApi from "@/api/join";

const state = {
  joinRequests: [],
};

const getters = {
  joinRequests: (state) => state.joinRequests,
};

const actions = {
  async fetchJoinRequests({ commit, dispatch }) {
    try {
      const joinRequests = await joinApi.getJoinRequestByCreator();

      commit("setJoinRequests", joinRequests);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setJoinRequests: (state, joinRequests) => {
    state.joinRequests = joinRequests;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
