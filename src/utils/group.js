import i18n from "@/i18n";

export const GroupTypeEnum = {
  security: "security",
  distribution: "distribution",
};
Object.freeze(GroupTypeEnum);

export function GroupTypeValueToText(request) {
  switch (request) {
    case GroupTypeEnum.security:
      return i18n.t("securityGroups.name");
    case GroupTypeEnum.distribution:
      return i18n.t("distributionGroups.name");
    default:
      return i18n.t("unknown");
  }
}

export function GroupTypeSuffixGroupName(request) {
  switch (request) {
    case GroupTypeEnum.security:
      return i18n.t("securityGroups.suffix");
    case GroupTypeEnum.distribution:
      return i18n.t("distributionGroups.suffix");
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

export function formatGroup(group) {
  group.attendees = group.members.length;
  group.hierarchy = getHierarchyFromDisplayNameAndName(group.displayName, group.name);

  return group;
}

export function isOwner(group, user) {
  return group.owner.sAMAccountName === user.sAMAccountName
}

export function isMember(group, user) {
  return group.members.some((member) => {member.sAMAccountName === user.sAMAccountName})

}
