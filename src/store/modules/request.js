const state = {
  requests: [],
};

const getters = {
  requests: (state) => state.requests,
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
};

const mutations = {
  setRequests: (state, requests) => {
    state.requests = requests;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
