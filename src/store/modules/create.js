import * as createApi from "@/api/create";

const state = {
  createRequests: [],
};

const getters = {
  createRequests: (state) => state.createRequests,
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
};

const mutations = {
  setCreateRequests: (state, createRequests) => {
    state.createRequests = createRequests;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
