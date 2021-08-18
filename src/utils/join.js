import * as groupApi from "@/api/group";
import { RequestTypeEnum } from "./request";

export async function formatJoinRequests(requests) {
  const requestsFormatted = Promise.all(
    requests.map(async (request) => {
      const group = await groupApi.getGroupById(request.groupId);
      request = { ...request, ...group };
      request.reqType = RequestTypeEnum.join;
      return request;
    })
  );

  return requestsFormatted;
}
