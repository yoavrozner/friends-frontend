export function formatKartoffelUser(user) {
  const formatedUser = user;
  formatedUser.displayName = `${user.firstName} ${user.lastName ? user.lastName : ""} > ${user.hierarchyFlat}`;
  return formatedUser;
}

export function formatADUser(user) {
  const formatedUser = user;
  formatedUser.id = user.sAMAccountName;
  return formatedUser;
}

export function getUserLimitMembers() {
  // TODO: implement
  return 100;
}
