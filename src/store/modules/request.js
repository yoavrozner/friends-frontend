const state = {
  requests: [],
  requestsApprover: [],
};

const getters = {
  requests: (state) => state.requests,
  requestsApprover: (state) => state.requestsApprover,
};

const actions = {
  async fetchRequests({ commit, dispatch, rootState }) {
    try {
      await Promise.all([
        dispatch("fetchJoinRequests"),
        dispatch("fetchCreateRequests"),
        dispatch("fetchOwnerRequests"),
      ]);

      const requests = [
        ...rootState.join.joinRequests,
        ...rootState.create.createRequests,
        ...rootState.owner.ownerRequests,
      ];
      commit("setRequests", requests);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchRequestsApprover({ commit, dispatch, rootState }) {
    try {
      await Promise.all([
        dispatch("fetchJoinRequestsApprover"),
        dispatch("fetchCreateRequestsApprover"),
        dispatch("fetchOwnerRequestsApprover"),
      ]);

      const requestsApprover = [
        ...rootState.join.joinRequestsApprover,
        ...rootState.create.createRequestsApprover,
        ...rootState.owner.ownerRequestsApprover,
      ];
      commit("setRequestsApprover", requestsApprover);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setRequests: (state, requests) => {
    state.requests = requests;
  },
  setRequestsApprover: (state, requestsApprover) => {
    state.requestsApprover = requestsApprover;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
