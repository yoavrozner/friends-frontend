/* eslint-disable no-unused-vars */
import Axios from "axios";
import store from "@/store";
import { baseURL } from "@/config";
import { RequestTypeEnum } from "@/utils/request";

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
  //   try {
  //     const res = await Axios.post(`${baseURL}/api/create/request`, {
  //       approver: approverId,
  //       group: {
  //         groupName,
  //         hierarchy,
  //         displayName,
  //         classification,
  //         type,
  //         members,
  //       },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     store.dispatch("onError", error);
  //   }

  return groupName;
}

/**
 * getGroupRequestByCreator - get group request by creator
 * */
export async function getGroupRequestByCreator() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/create/requests/creator`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  const requests = [
    {
      id: 1,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      status: "Denied",
      createdAt: "02.03.2021",
      group: {
        groupName: "Meluhim_purpleM_SG@services.idf",
        hierarchy: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/שיתוף מלוחים סמצ",
        displayName: "קבוצה מגניבה",
        classification: "limitedPurple",
        owner: "1203032",
        members: ["ramad@services.idf", "ddk@services.idf"],
        type: "distribution",
      },
    },
    {
      id: 2,
      creator: "יואב רוזנר",
      approver: "רשצ טורטית",
      status: "Approved",
      createdAt: "02.03.2021",
      group: {
        groupName: "Meluhim_purpleM_SG@services.idf",
        hierarchy: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/שיתוף מלוחים סמצ",
        displayName: "קבוצה חריפה",
        classification: "blue",
        owner: "1203033",
        members: ["ramad@services.idf", "ddk@services.idf"],
        type: "security",
      },
    },
    {
      id: 3,
      creator: "מאיה פישר",
      approver: "רשצ ביסלי",
      status: "Pending",
      createdAt: "02.03.2021",
      group: {
        groupName: "Meluhim_purpleM_SG@services.idf",
        hierarchy: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/שיתוף מלוחים סמצ",
        displayName: "קבוצה מתוקה",
        classification: "administrative",
        owner: "1203032",
        members: ["ramad@services.idf", "ddk@services.idf", "ddk@services.idf"],
        type: "security",
      },
    },
  ].map((request) => {
    request.reqType = RequestTypeEnum.create;
    request.displayName = request.group.displayName;
    request.type = request.group.type;
    return request;
  });

  return requests;
}

/**
 * getGroupRequestByApprover - get group requests by approver
 * */
export async function getGroupRequestByApprover() {
  // try {
  //   const res = await Axios.get(`${baseURL}/api/create/requests/approver`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  const requests = [
    {
      id: 1,
      creator: "נטע שבירו",
      approver: "רשצ טורטית",
      status: "Denied",
      createdAt: "02.03.2021",
      group: {
        groupName: "Meluhim_purpleM_SG@services.idf",
        hierarchy: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/שיתוף מלוחים סמצ",
        displayName: "קבוצה מגניבה",
        classification: "limitedPurple",
        owner: "1203032",
        members: ["ramad@services.idf", "ddk@services.idf"],
        type: "distribution",
      },
    },
    {
      id: 2,
      creator: "יואב רוזנר",
      approver: "רשצ טורטית",
      status: "Approved",
      createdAt: "02.03.2021",
      group: {
        groupName: "Meluhim_purpleM_SG@services.idf",
        hierarchy: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/שיתוף מלוחים סמצ",
        displayName: "קבוצה חריפה",
        classification: "blue",
        owner: "1203033",
        members: ["ramad@services.idf", "ddk@services.idf"],
        type: "security",
      },
    },
    {
      id: 3,
      creator: "מאיה פישר",
      approver: "רשצ ביסלי",
      status: "Pending",
      createdAt: "02.03.2021",
      group: {
        groupName: "Meluhim_purpleM_SG@services.idf",
        hierarchy: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/שיתוף מלוחים סמצ",
        displayName: "קבוצה מתוקה",
        classification: "administrative",
        owner: "1203032",
        members: ["ramad@services.idf", "ddk@services.idf", "ddk@services.idf"],
        type: "security",
      },
    },
  ].map((request) => {
    request.reqType = RequestTypeEnum.create;
    request.displayName = request.group.displayName;
    request.type = request.group.type;
    return request;
  });

  return requests;
}

/**
 * denyGroupRequest - deny group create request
 * @param {string} createReqId - create request id
 * */
export async function denyGroupRequest(createReqId) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/create/deny/:createReqId`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return createReqId;
}

/**
 * approveGroupRequest - approve group create request
 * @param {string} createReqId - create request id
 * */
export async function approveGroupRequest(createReqId) {
  // try {
  //   const res = await Axios.put(`${baseURL}/api/create/approve/:createReqId`);
  //   return res.data;
  // } catch (error) {
  //   store.dispatch("onError", error);
  // }

  return createReqId;
}
