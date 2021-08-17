/* eslint-disable no-unused-vars */
import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { RequestTypeEnum } from "@/utils/request";

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

  const requests = [
    {
      id: 7,
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
      id: 8,
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
      id: 9,
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
    request.reqType = RequestTypeEnum.owner;
    return request;
  });

  // GET GROUP BY ID
  return requests;
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
    request.reqType = RequestTypeEnum.owner;
    return request;
  });

  // GET GROUP BY ID

  return requests;
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
