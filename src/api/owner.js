/* eslint-disable no-unused-vars */
import Axios from "axios";
import store from "@/store";
import requests from "@/objects/owner";
import { baseURL } from "@/config";
import { RequestTypeEnum } from "@/utils/request";
import { formatOwnerRequests } from "@/utils/owner";
/**
 * createOwnerRequest for change owner to group
 * @param {string} groupId - group id
 * @param {string} ownerId - new owner id
 **/
export async function createOwnerRequest({ groupId, ownerId }) {
  // try {
  //   const res = await Axios.post(`${baseURL}/api/owner/request`, {
  //     groupId,
  //     approverId,
  //   });
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return groupId;
}

/**
 * getOwnerRequestByCreator - get owner requests by creator
 * */
export async function getOwnerRequestByCreator() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/owner/requests/creator`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  const requestsFormatted = formatOwnerRequests(requests);
  return requestsFormatted;
}

/**
 * getOwnerRequestByApprover - get owner requests by approver
 * */
export async function getOwnerRequestByApprover() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/owner/requests/approver`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  const requestsFormatted = formatOwnerRequests(requests);
  return requestsFormatted;
}

/**
 * denyOwnerRequest - deny owner request
 * @param {string} ownerReqId - owner request id
 * */
export async function denyJoinRequest(ownerReqId) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/owner/deny/:ownerReqId`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return ownerReqId;
}

/**
 * approveOwnerRequest - approve owner request
 * @param {string} ownerReqId - owner request id
 * */
export async function approveOwnerRequest(ownerReqId) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/owner/approve/:ownerReqId`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return ownerReqId;
}
