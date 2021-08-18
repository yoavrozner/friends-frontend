/* eslint-disable no-unused-vars */
import Axios from "axios";
import store from "@/store";
import groups from "@/objects/group";
import { baseURL } from "@/config";
import { formatGroup } from "@/utils/group";

/**
 * searchGroups - search groups (distribution and security)
 * @param {string} partialName - partial name of the group
 * */
export async function searchGroups(partialName) {
  // const searchDistributionGroups = async (partialName) => {
  //   const res = await Axios.get(`${baseURL}/api/groups/distribution?partialName=${partialName}`);
  //   return res.data;
  // };

  // const searchSecurityGroups = async (partialName) => {
  //   const res = await Axios.get(`${baseURL}/api/groups/security?partialName=${partialName}`);
  //   return res.data;
  // };

  // try {
  //   const [distributionGroups, securityGroups] = await Promise.all([
  //     searchDistributionGroups(partialName),
  //     searchSecurityGroups(partialName),
  //   ]);
  //   const groups = [...distributionGroups, ...securityGroups];
  //   return groups;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  groups.map((group) => formatGroup(group));
  return groups;
}

/**
 * getGroupById - get group by id (sAMAccountName)
 * @param {string} id - id of the group
 * */
export async function getGroupById(id) {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/groups/${id}`);
  //   const group = res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  let group = groups[0];
  group = formatGroup(group);
  return group;
}

/**
 * getUserGroups - get user groups
 * */
export async function getUserGroups() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/user/groups`);
  //   const groups = res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  groups.map((group) => formatGroup(group));
  return groups;
}

/**
 * updateGroupOwner - update group owner
 * @param {string} groupId - id of the group
 * @param {string} owner - new owner
 * */
export async function updateGroupOwner(groupId, owner) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/group`, { groupId, owner });
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return;
}

/**
 * updateGroupDisplayName - update group display name
 * @param {string} groupId - id of the group
 * @param {string} displayName - new display name
 * */
export async function updateGroupDisplayName(groupId, displayName) {
  try {
    const res = await Axios.put(`${baseURL}/api/group`, { groupId, displayName });
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
    return null;
  }
}

/**
 * addGroupMember - add group member
 * @param {string} groupId - id of the group
 * @param {string[]} users - new members (sAMAccountName)
 * */
export async function addGroupMember(groupId, users) {
  // try {
  // const res = await Axios.put(`${baseURL}/api/groups/users`, { groupId, users });
  // return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return;
}

/**
 * deleteGroupMember - delete group member
 * @param {string} groupId - id of the group
 * @param {string[]} users - members to delete (sAMAccountName)
 * */
export async function deleteGroupMember(groupId, users) {
  // try {
  //   const res = await Axios.delete(`${baseURL}/api/groups/users`, { groupId, users });
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return;
}

/**
 * deleteGroup - remove group
 * @param {string} groupId - id of the group
 * */
export async function deleteGroup(groupId) {
  // try {
  //   const res = await Axios.delete(`${baseURL}/api/group/${groupId}`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return;
}
