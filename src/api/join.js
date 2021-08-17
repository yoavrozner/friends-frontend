/* eslint-disable no-unused-vars */
import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { RequestTypeEnum } from "@/utils/request";

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

  const requests = [
    {
      id: 4,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      groupId: "check@services.idf",
      status: "Denied",
      createdAt: "02.03.2021",
      // todo: get group by id to get this fields
      type: "security",
      displayName: "מפקדת אסם/ ענף חטיפים/ מדור מתוקים/ תפוצת טורטית כחול",
    },
    {
      id: 5,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      groupId: "check@services.idf",
      status: "Approved",
      createdAt: "04.03.2021",
      // todo: get group by id to get this fields
      type: "distribution",
      displayName: "מפקדת אסם/ ענף חטיפים/ מדור מתוקים/ תפוצת טורטית כחול",
    },
    {
      id: 6,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      groupId: "check@services.idf",
      createdAt: "04.03.2021",
      status: "Approved",
      // todo: get group by id to get this fields
      type: "security",
      displayName: "מפקדת אסם/ ענף חטיפים/ מדור מתוקים/ תפוצת טורטית כחול",
    },
  ].map((request) => {
    request.reqType = RequestTypeEnum.join;
    return request;
  });

  // GET GROUP BY ID
  return requests;
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

  const requests = [
    {
      id: 1,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      groupId: "check@services.idf",
      status: "Denied",
      createdAt: "02.03.2021",
      // todo: get group by id to get this fields
      type: "security",
      displayName: "מפקדת אסם/ ענף חטיפים/ מדור מתוקים/ תפוצת טורטית כחול",
    },
    {
      id: 2,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      groupId: "check@services.idf",
      status: "Approved",
      createdAt: "04.03.2021",
      // todo: get group by id to get this fields
      type: "distribution",
      displayName: "מפקדת אסם/ ענף חטיפים/ מדור מתוקים/ תפוצת טורטית כחול",
    },
    {
      id: 3,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      groupId: "check@services.idf",
      createdAt: "04.03.2021",
      status: "Approved",
      // todo: get group by id to get this fields
      type: "security",
      displayName: "מפקדת אסם/ ענף חטיפים/ מדור מתוקים/ תפוצת טורטית כחול",
    },
  ].map((request) => {
    request.reqType = RequestTypeEnum.join;
    return request;
  });

  // GET GROUP BY ID

  return requests;
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
