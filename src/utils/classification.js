import i18n from "@/i18n";

export const ClassificationTypeEnum = {
  limitedPurple: "limitedPurple",
  administrative: "administrative",
  blue: "blue",
};
Object.freeze(ClassificationTypeEnum);

export function ClassificationTypeValueToText(classification) {
  switch (classification) {
    case ClassificationTypeEnum.limitedPurple:
      return i18n.t("group.classification.options.limitedPurple");
    case ClassificationTypeEnum.administrative:
      return i18n.t("group.classification.options.administrative");
    case ClassificationTypeEnum.blue:
      return i18n.t("group.classification.options.blue");
    default:
      return i18n.t("unknown");
  }
}

export function ClassificationTypeValueToColor(classification) {
  switch (classification) {
    case ClassificationTypeEnum.limitedPurple:
      return "purple";
    case ClassificationTypeEnum.administrative:
      return "green";
    case ClassificationTypeEnum.blue:
      return "blue";
    default:
      return "default";
  }
}
