const state = {
  limitDisplayName: 20,
  minLimitGroupName: 2,
  authURL: '/auth/login',
};

const getters = {
  limitDisplayName: (state) => state.limitDisplayName,
  minLimitGroupName: (state) => state.minLimitGroupName,
};

export default {
  state,
  getters,
};
