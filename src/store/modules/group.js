import * as groupApi from "@/api/group";

const state = {
  ownedGroups: [],
  myGroups: [],
};

const getters = {
  ownedGroups: (state) => state.ownedGroups,
  myGroups: (state) => state.myGroups,
};

const actions = {
  async fetchOwnedGroups({ commit, dispatch }) {
    try {
      const ownedGroups = await groupApi.getUserGroups();

      commit(
        "setOwnedGroups",
        ownedGroups.map((group) => {
          group.edit = true;
          return group;
        })
      );
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchMyGroups({ commit, dispatch }) {
    try {
      const myGroups = await groupApi.getUserGroups();

      commit("setMyGroups", myGroups);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setOwnedGroups: (state, ownedGroups) => {
    state.ownedGroups = ownedGroups;
  },
  setMyGroups: (state, myGroups) => {
    state.myGroups = myGroups;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
