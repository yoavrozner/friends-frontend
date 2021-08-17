import i18n from "@/i18n";

export const RequestTypeEnum = {
  join: "join",
  owner: "owner",
  create: "create",
};
Object.freeze(RequestTypeEnum);

export function RequestTypeValueToText(request) {
  switch (request) {
    case RequestTypeEnum.join:
      return i18n.t("request.type.join");
    case RequestTypeEnum.owner:
      return i18n.t("request.type.owner");
    case RequestTypeEnum.create:
      return i18n.t("request.type.create");
    default:
      return i18n.t("unknown");
  }
}
