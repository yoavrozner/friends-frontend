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
      // TODO: fitler state.mygroups
      const ownedGroups = state.myGroups || [];

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
      console.log("fetchMyGroups");
      const myGroups = await groupApi.getUserGroups();
console.log("myGroups",myGroups);
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
