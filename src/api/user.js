import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { formatKartoffelUser, formatADUser } from "@/utils/user";

/**
 * getUserByKartoffelId returns the user by the kartoffelId
 * @param kartoffelId is the user kartoffel id
 */
export async function getUserByKartoffelId(kartoffelId) {
  try {
    const res = await Axios.get(`${baseURL}/api/user/kartoffel/${kartoffelId}`);
    const user = formatKartoffelUser(res.data.user);
    store.commit("addUserToictionary", user);

    return user;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * getUserByDomainUser returns the user by the domain user
 * @param domainUser is the user domain user
 * */
export async function getUserByDomainUser(domainUser) {
  try {
    const res = await Axios.get(`${baseURL}/api/user/domainuser/${domainUser}`);
    const user = formatKartoffelUser(res.data.user);
    store.commit("addUserToictionary", user);

    return user;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * searchUsersByName gets all the users with the received name
 * @param name is the name of the users
 */
export async function searchUsersByName(name) {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { partial: name },
    });
    const users = res.data.users
      ? res.data.users.filter((user) => {
          return user.id !== store.state.auth.user.id;
        })
      : [];

    return Promise.all(users.map((user) => formatADUser(user)));
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * isApprover checks if the user is an approver
 * */
export async function isApprover() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/user/approver`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return true;
}

/**
 * isSuperUser checks if the user is admin
 * */
export async function isSuperUser() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/user/super`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return true;
}

/**
 * searchApproverByName gets all the approvers with the received name
 * @param name is the name of the approver
 */
export async function searchApproverByName(name) {
  try {
    const res = await Axios.get(`${baseURL}/api/users/approvers`, {
      params: { partial: name },
    });
    const users = res.data.users
      ? res.data.users.filter((user) => {
          return user.id !== store.state.auth.user.id;
        })
      : [];
    return Promise.all(users.map((user) => formatKartoffelUser(user)));
  } catch (error) {
    store.dispatch("onError", error);
  }
}
