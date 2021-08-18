import i18n from "@/i18n";

export const StatusEnum = {
  Denied: "Denied",
  Pending: "Pending",
  Approved: "Approved",
};
Object.freeze(StatusEnum);

export function StatusValueToText(status) {
  switch (status) {
    case StatusEnum.Approved:
      return i18n.t("request.status.approved");
    case StatusEnum.Denied:
      return i18n.t("request.status.denied");
    case StatusEnum.Pending:
      return i18n.t("request.status.pending");
    default:
      return i18n.t("request.status.unknown");
  }
}

export function StatusValueToColor(status) {
  switch (status) {
    case StatusEnum.Approved:
      return "green";
    case StatusEnum.Denied:
      return "red";
    case StatusEnum.Pending:
      return "orange";
    default:
      return "default";
  }
}
