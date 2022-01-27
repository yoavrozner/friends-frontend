import store from '@/store';

export function formatKartoffelUser(user) {
  const formatedUser = user;
  formatedUser.displayName = `${user.firstName ? user.firstName : ''} ${user.lastName ? user.lastName : ''} > ${user.hierarchy ? user.hierarchy.join('/') : '' }`;
  return formatedUser;
}

export function formatADUser(user) {
  const formatedUser = user;
  formatedUser.id = user.sAMAccountName;
  return formatedUser;
}

export function getUserLimitMembers() {
  const isApprover = store.getters.isApprover;
  const isSuper = store.getters.isSuper;
  if (isSuper) {
    return Infinity;
  } else if (isApprover) {
    return 1000;
  } else {
    return 100;
  }
}
