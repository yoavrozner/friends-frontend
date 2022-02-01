import Axios from 'axios';
import store from '@/store';
import { baseURL } from '@/config';
import { formatGroup } from '@/utils/group';

/**
 * searchGroups - search groups (distribution and security)
 * @param {string} partialName - partial name of the group
 * */
export async function searchGroups(partialName) {
  const searchDistributionGroups = async (partialName) => {
    const res = await Axios.get(
      `${baseURL}/api/ad/groups/distribution?partialName=${partialName}`
    );
    return res.data;
  };

  const searchSecurityGroups = async (partialName) => {
    // const res = await Axios.get(
    //   `${baseURL}/api/ad/groups/security?partialName=${partialName}`
    // );
    // return res.data;
    console.log(partialName);
    return [];
  };

  try {
    const [distributionGroups, securityGroups] = await Promise.all([
      searchDistributionGroups(partialName),
      searchSecurityGroups(partialName),
    ]);
    const groups = [...distributionGroups, ...securityGroups];
    groups.map((group) => formatGroup(group));

    return groups;
  } catch (error) {
    store.dispatch('onError', error);
  }
}

/**
 * getGroupById - get group by id (sAMAccountName)
 * @param {string} id - id of the group
 * */
export async function getGroupById(id) {
  try {
    const res = await Axios.get(`${baseURL}/api/ad/groups/${id}`);
    let group = res.data;
    group = formatGroup(group);
    return group;
  } catch (error) {
    store.dispatch('onError', error);
  }
}

/**
 * getUserGroups - get user groups
 * */
export async function getUserGroups() {
  try {
    const res = await Axios.get(`${baseURL}/api/ad/groups/user`);
    console.log('res', res);
    const groups = res.data;
    groups.map((group) => formatGroup(group));

    console.log("groups",groups);
    return groups;
  } catch (error) {
    store.dispatch('onError', error);
  }
}

/**
 * updateGroupOwner - update group owner
 * @param {string} groupId - id of the group
 * @param {string} owner - new owner
 * */
export async function updateGroupOwner(groupId, owner) {
  try {
    const res = await Axios.put(`${baseURL}/api/ad/group`, { groupId, owner });
    return res.data;
  } catch (error) {
    store.dispatch('onError', error);
  }
}

/**
 * updateGroupDisplayName - update group display name
 * @param {string} groupId - id of the group
 * @param {string} displayName - new display name
 * */
export async function updateGroupDisplayName(groupId, displayName) {
  try {
    const res = await Axios.put(`${baseURL}/api/ad/group`, {
      groupId,
      displayName,
    });
    return res.data;
  } catch (error) {
    store.dispatch('onError', error);
    return null;
  }
}

/**
 * updateGroupName - update group name
 * @param {string} groupId - id of the group
 * @param {string} groupName - new display name
 * */
export async function updateGroupName(groupId, name) {
  try {
    const res = await Axios.put(`${baseURL}/api/ad/group`, { groupId, name });
    return res.data;
  } catch (error) {
    store.dispatch('onError', error);
    return null;
  }
}

/**
 * addGroupMember - add group member
 * @param {string} groupId - id of the group
 * @param {string[]} users - new members (sAMAccountName)
 * */
export async function addGroupMember(groupId, users) {
  try {
    const res = await Axios.put(`${baseURL}/api/ad/group/users`, {
      groupId,
      users,
    });
    return res.data;
  } catch (error) {
    store.dispatch('onError', error);
  }
}

/**
 * deleteGroupMember - delete group member
 * @param {string} groupId - id of the group
 * @param {string[]} users - members to delete (sAMAccountName)
 * */
export async function deleteGroupMember(groupId, users) {
  try {
    const res = await Axios.delete(`${baseURL}/api/ad/group/users`, {
      data: {
        groupId,
        users,
      },
    });
    return res.data;
  } catch (error) {
    store.dispatch('onError', error);
  }
}

/**
 * deleteGroup - remove group
 * @param {string} groupId - id of the group
 * */
export async function deleteGroup(groupId) {
  try {
    const res = await Axios.delete(`${baseURL}/api/ad/group/${groupId}`);
    return res.data;
  } catch (error) {
    store.dispatch('onError', error);
  }
}
