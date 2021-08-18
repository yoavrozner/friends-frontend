const groups = [
  {
    sAMAccountName: "Meluhim_purpleM_SG@services.idf",
    displayName: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/מלוחים טעימים מאוד/שיתוף מלוחים סמצ",
    name: "שיתוף מלוחים סמצ",
    classification: "limitedPurple",
    members: [
      { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
    ],
    owner: { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
    type: "distribution",
  },
  {
    sAMAccountName: "MeluhimMefakdim_ops_DG@services.idf",
    displayName: "מפקדת אסם/ ענף חטיפים/ מדור מלוחים/תפוצת מפקדים מנהלי",
    name: "תפוצת מפקדים מנהלי",
    members: [
      { displayName: "רמד מלוחים", sAMAccountName: "ramad@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
      { displayName: "רמד מתוקים", sAMAccountName: "ddk@services.idf" },
    ],
    owner: { displayName: "רמד מלוחים" },
    type: "security",
    classification: "administrative",
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
