import * as groupApi from "@/api/group";
import { RequestTypeEnum } from "./request";

export async function formatJoinRequests(requests) {
  const requestsFormatted = await Promise.all(
    requests.map(async (request) => {
      const group = groupApi.getGroupById(request.groupId);
      request = { ...request, ...group };
      request.reqType = RequestTypeEnum.join;
      return request;
    })
  );

  return requestsFormatted;
}
