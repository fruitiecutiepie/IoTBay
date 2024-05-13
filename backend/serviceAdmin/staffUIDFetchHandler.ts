import { FetchHandler } from "..";
import { staffUIDFetchHandler } from "./fetchHandlers/staffUID";

export const staffFetchHandler: FetchHandler = {
  ...staffUIDFetchHandler,
}