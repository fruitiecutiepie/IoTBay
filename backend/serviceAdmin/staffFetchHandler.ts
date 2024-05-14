import { FetchHandler } from "..";
import { userListFetchHandler } from "./fetchHandlers/staffList";
import { staffUIDFetchHandler } from "./fetchHandlers/staffUID";
import { userNumberFetchHandler } from "./fetchHandlers/userNumber";

export const staffFetchHandler: FetchHandler = {
  ...staffUIDFetchHandler,
  ...userListFetchHandler,
  ...userNumberFetchHandler
}