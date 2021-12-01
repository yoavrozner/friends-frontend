import * as usersApi from '@/api/user';
import cookies from 'js-cookie';
import { Base64 } from 'js-base64';

const state = {
  token: cookies.get('jt-token') || undefined,
  user: undefined,
  isApprover: false,
  isSuper: false,
};

const getters = {
  isAuthenticated: (state) => !!state.token && !!state.user,
  user: (state) => state.user,
  isApprover: (state) => state.isApprover,
  isSuper: (state) => state.isSuper,
};

const actions = {
  async authenticate({ dispatch }) {
    if (state.token) {
      await dispatch('parseToken');
    } else {
      window.location.replace('/auth/login');
    }
  },
  logout({ commit }) {
    cookies.remove('jt-token');
    commit('setToken', undefined);
  },
  async getApproverInfo({ commit }) {
    const isApprover = await usersApi.isApprover();
    commit('setIsApprover', isApprover);
  },
  async getSuperInfo({ commit }) {
    const isSuper = await usersApi.isSuperUser();
    commit('setIsSuper', isSuper);
  },
  async parseToken({ commit, dispatch }) {
    try {
      const token = state.token;
      const parts = token.split('.');

      if (parts.length !== 3) {
        dispatch('logout');
        throw new Error('token malformed');
      }

      let user = JSON.parse(Base64.decode(parts[1]));
      console.log(user);
      if (Math.round(new Date().getTime() / 1000) > user.exp) {
        dispatch('logout');
        throw new Error('token expired');
      }

      // TODO: Fix this get
      const res = await usersApi.getUserByKartoffelId(user.id);
      console.log('before',res,user);

      user.hierarchyFlat = res.hierarchy.join('/');
      console.log('after', res);
      console.log('user:', user);
      // user.hierarchyFlat = "מערך ספיר/‏מטה/‏ענף יסודות/‏מדור קריפטון/‏צוות פנדורה‏";

      user.sAMAccountName = user.email.split('@')[0];

      commit('setUser', user);

      dispatch('getApproverInfo');
      dispatch('getSuperInfo');
    } catch (err) {
      dispatch('onError', err);
    }
  },
};

const mutations = {
  setToken: (state) => (state.token = cookies.get('jt-token')),
  setUser: (state, user) => {
    state.user = user;
  },
  setIsApprover: (state, isApprover) => {
    state.isApprover = isApprover;
  },
  setIsSuper: (state, isSuper) => {
    state.isSuper = isSuper;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
