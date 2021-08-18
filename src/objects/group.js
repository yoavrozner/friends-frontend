const groups = [
  {
    sAMAccountName: "netta_purpleM_SG",
    displayName: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/מלוחים טעימים מאוד/שיתוף מלוחים סמצ",
    name: "שיתוף מלוחים סמצ",
    classification: "limitedPurple",
    members: [
      { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
    ],
    owner: { displayName: "מאיה", sAMAccountName: "maya" },
    type: "security",
  },
  {
    sAMAccountName: "maya_purpleM_SG",
    displayName: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/תפוצת מפקדים מנהלי",
    name: "תפוצת מפקדים מנהלי",
    members: [
      { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
    ],
    owner: { displayName: "רמד מלוחים" },
    type: "security",
    classification: "limitedPurple",
  },
  {
    displayName: "עלית/ תפוצת מתוקים",
    name: "תפוצת מתוקים",
    members: [
      { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
      { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
    ],
    owner: { displayName: "עלית רמד מתוקים" },
    type: "distribution",
    classification: "blue",
    sAMAccountName: "metukin_mail@d360",
  },
];

export default groups;
