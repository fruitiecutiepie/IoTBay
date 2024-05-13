import { FetchHandler } from "..";
import { userListFetchHandler } from "./fetchHandlers/staffList";
import { staffUIDFetchHandler } from "./fetchHandlers/staffUID";

export const staffFetchHandler: FetchHandler = {
  ...staffUIDFetchHandler,
  ...userListFetchHandler
}