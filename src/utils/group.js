import i18n from "@/i18n";

export const GroupTypeEnum = {
  security: "security",
  distribution: "distribution",
};
Object.freeze(GroupTypeEnum);

export function GroupTypeValueToText(request) {
  switch (request) {
    case GroupTypeEnum.security:
      return i18n.t("securityGroups");
    case GroupTypeEnum.distribution:
      return i18n.t("distributionGroups");
    default:
      return i18n.t("unknown");
  }
}

export function isDistributionGroup(group) {
  return group.type === GroupTypeEnum.distribution;
}

export function isSecurityGroup(group) {
  return group.type === GroupTypeEnum.security;
}

export function getHierarchyFromDisplayNameAndName(displayName, name) {
  return displayName.replace(new RegExp("/" + name + "$"), "");
}
