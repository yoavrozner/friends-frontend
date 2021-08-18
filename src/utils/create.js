import { RequestTypeEnum } from "./request";

export function formatCreateRequests(requests) {
  const requestsFormatted = requests.map((request) => {
    request.reqType = RequestTypeEnum.create;
    request = { ...request, ...request.group };
    request.attendees = request.members.length;
    return request;
  });

  return requestsFormatted;
}
