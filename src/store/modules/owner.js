import * as ownerApi from "@/api/owner";

const state = {
  ownerRequests: [],
  ownerRequestsApprover: [],
};

const getters = {
  ownerRequests: (state) => state.ownerRequests,
  ownerRequestsApprover: (state) => state.ownerRequestsApprover,
};

const actions = {
  async fetchOwnerRequests({ commit, dispatch }) {
    try {
      const ownerRequests = await ownerApi.getOwnerRequestByCreator() || [];

      commit("setOwnerRequests", ownerRequests);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchOwnerRequestsApprover({ commit, dispatch }) {
    try {
      const ownerRequestsApprover = await ownerApi.getOwnerRequestByApprover() || [];

      commit(
        "setOwnerRequestsApprover",
        ownerRequestsApprover.map((request) => {
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
  setOwnerRequests: (state, ownerRequests) => {
    state.ownerRequests = ownerRequests;
  },
  setOwnerRequestsApprover: (state, ownerRequestsApprover) => {
    state.ownerRequestsApprover = ownerRequestsApprover;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
