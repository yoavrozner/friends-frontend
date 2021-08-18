import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { formatOwnerRequests } from "@/utils/owner";
/**
 * createOwnerRequest for change owner to group
 * @param {string} groupId - group id
 * @param {string} ownerId - new owner id
 **/
export async function createOwnerRequest({ groupId, ownerId }) {
  try {
    const res = await Axios.post(`${baseURL}/api/owner/request`, {
      groupId,
      ownerId,
    });
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * getOwnerRequestByCreator - get owner requests by creator
 * */
export async function getOwnerRequestByCreator() {
  try {
    const res = await Axios.get(`${baseURL}/api/owner/requests/creator`);
    const requestsFormatted = formatOwnerRequests(res.data);
    return requestsFormatted;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * getOwnerRequestByApprover - get owner requests by approver
 * */
export async function getOwnerRequestByApprover() {
  try {
    const res = await Axios.get(`${baseURL}/api/owner/requests/approver`);
    const requestsFormatted = formatOwnerRequests(res.data);
    return requestsFormatted;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * denyOwnerRequest - deny owner request
 * @param {string} ownerReqId - owner request id
 * */
export async function denyJoinRequest(ownerReqId) {
  try {
    const res = await Axios.put(`${baseURL}/api/owner/deny/${ownerReqId}`);
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
  }
}

/**
 * approveOwnerRequest - approve owner request
 * @param {string} ownerReqId - owner request id
 * */
export async function approveOwnerRequest(ownerReqId) {
  try {
    const res = await Axios.put(`${baseURL}/api/owner/approve/${ownerReqId}`);
    return res.data;
  } catch (error) {
    store.dispatch("onError", error);
  }
}
