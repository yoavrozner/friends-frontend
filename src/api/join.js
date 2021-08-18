/* eslint-disable no-unused-vars */
import requests from "@/objects/join";
import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { RequestTypeEnum } from "@/utils/request";
import { formatJoinRequests } from "@/utils/join";

/**
 * createJoinRequest for joining group
 * @param {string} groupId - group id
 * @param {string} approverId - approver id
 * @param {string} joinReason - join reason
 **/
export async function createJoinRequest({ groupId, approverId, joinReason }) {
  // try {
  //   const res = await Axios.post(`${baseURL}/api/join/request`, {
  //     groupId,
  //     approverId,
  //    joinReason,
  //   });
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return groupId;
}

/**
 * getJoinRequestsByCreator - get join requests by creator
 * */
export async function getJoinRequestByCreator() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/join/requests/creator`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  const requestsDetail = await formatJoinRequests(requests);

  return requestsDetail;
}

/**
 * getJoinRequestByApprover - get join requests by approver
 * */
export async function getJoinRequestByApprover() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/join/requests/approver`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  const requestsDetail = await formatJoinRequests(requests);
  return requestsDetail;
}

/**
 * denyJoinRequest - deny join request
 * @param {string} joinReqId - join request id
 * */
export async function denyJoinRequest(joinReqId) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/join/deny/:joinReqId`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return joinReqId;
}

/**
 * approveJoinRequest - approve join request
 * @param {string} joinReqId - join request id
 * */
export async function approveJoinRequest(joinReqId) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/join/approve/:joinReqId`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return joinReqId;
}
