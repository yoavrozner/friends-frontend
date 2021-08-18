import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { formatCreateRequests } from "@/utils/create";
/**
 * createGroupRequest for creating group
 * @param {string} approverId - approver id
 * @param {string} groupName - group name
 * @param {string} type - group type (distribution or security)
 * @param {string} hierarchy - group hierarchy
 * @param {string} displayName - group display name
 * @param {string} classification - group classification
 * @param {string[]} members - group members
 *  **/
export async function createGroupRequest({
  approverId,
  groupName,
  hierarchy,
  type,
  displayName,
  classification,
  members,
}) {
  try {
    const res = await Axios.post(`${baseURL}/api/create/request`, {
      approver: approverId,
      group: {
        groupName,
        hierarchy,
        displayName,
        classification,
        type,
        members,
      },
    });
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * getGroupRequestByCreator - get group request by creator
 * */
export async function getGroupRequestByCreator() {
  try {
    const res = await Axios.get(`${baseURL}/api/create/requests/creator`);
    const requestsFormatted = formatCreateRequests(res.data);
    return requestsFormatted;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * getGroupRequestByApprover - get group requests by approver
 * */
export async function getGroupRequestByApprover() {
  try {
    const res = await Axios.get(`${baseURL}/api/create/requests/approver`);
    const requestsFormatted = formatCreateRequests(res.data);

    return requestsFormatted;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * denyGroupRequest - deny group create request
 * @param {string} createReqId - create request id
 * */
export async function denyGroupRequest(createReqId) {
  try {
    const res = await Axios.put(`${baseURL}/api/create/deny/${createReqId}`);
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * approveGroupRequest - approve group create request
 * @param {string} createReqId - create request id
 * */
export async function approveGroupRequest(createReqId) {
  try {
    const res = await Axios.put(`${baseURL}/api/create/approve/${createReqId}`);
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
  }
}
