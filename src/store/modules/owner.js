import * as ownerApi from "@/api/owner";

const state = {
  ownerRequests: [],
};

const getters = {
  ownerRequests: (state) => state.ownerRequests,
};

const actions = {
  async fetchOwnerRequests({ commit, dispatch }) {
    try {
      const ownerRequests = await ownerApi.getOwnerRequestByCreator();

      commit("setOwnerRequests", ownerRequests);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setOwnerRequests: (state, ownerRequests) => {
    state.ownerRequests = ownerRequests;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
