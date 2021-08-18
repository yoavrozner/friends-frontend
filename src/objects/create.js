// Example create Object
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
];

export default requests;
