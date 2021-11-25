import * as joinApi from "@/api/join";

const state = {
  joinRequests: [],
  joinRequestsApprover: [],
};

const getters = {
  joinRequests: (state) => state.joinRequests,
  joinRequestsApprover: (state) => state.joinRequestsApprover,
};

const actions = {
  async fetchJoinRequests({ commit, dispatch }) {
    try {
      const joinRequests = await joinApi.getJoinRequestByCreator() || [];

      commit("setJoinRequests", joinRequests);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchJoinRequestsApprover({ commit, dispatch }) {
    try {
      const joinRequestsApprover = await joinApi.getJoinRequestByApprover() || [];

      commit(
        "setJoinRequestsApprover",
        joinRequestsApprover.map((request) => {
          request.approve = true;
          return request;
        })
      );
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setJoinRequests: (state, joinRequests) => {
    state.joinRequests = joinRequests;
  },
  setJoinRequestsApprover: (state, joinRequestsApprover) => {
    state.joinRequestsApprover = joinRequestsApprover;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
