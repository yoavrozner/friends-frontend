const state = {
  success: false,
};

const getters = {
  success: (state) => state.success,
};

const actions = {
  onSuccess({ commit }, value) {
    console.log('onSuccess');
    {
      commit('setSuccess', value);
    }
  },
};

const mutations = {
  setSuccess: (state, value) => {
    console.log('setSuccess');
    state.success = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
