const state = {
    success: false,
  };
  
  const getters = {
    success:(state) => state.success,
  };
  
  const actions = {  
    onSuccess({ commit }) {console.log("onSuccess");
      {
        commit("setSuccess");
      }
    },
  };
  
  const mutations = {
    setSuccess: (state) => {console.log("setSuccess");state.success = true},
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  