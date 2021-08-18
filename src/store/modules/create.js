import * as createApi from "@/api/create";

const state = {
  createRequests: [],
  createRequestsApprover: [],
};

const getters = {
  createRequests: (state) => state.createRequests,
  createRequestsApprover: (state) => state.createRequestsApprover,
};

const actions = {
  async fetchCreateRequests({ commit, dispatch }) {
    try {
      const createRequests = await createApi.getGroupRequestByCreator();

      commit("setCreateRequests", createRequests);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchCreateRequestsApprover({ commit, dispatch }) {
    try {
      const createRequestsApprover = await createApi.getGroupRequestByApprover();

      commit(
        "setCreateRequestsApprover",
        createRequestsApprover.map((request) => {
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
  setCreateRequests: (state, createRequests) => {
    state.createRequests = createRequests;
  },
  setCreateRequestsApprover: (state, createRequestsApprover) => {
    state.createRequestsApprover = createRequestsApprover;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
