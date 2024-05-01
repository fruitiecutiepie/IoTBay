import { FetchHandler } from "..";
import { authUserFetchHandler } from "./fetchHandlers/authUser";
import { authUserSessionFetchHandler } from "./fetchHandlers/authUserSession";

export const authFetchHandler: FetchHandler = {
  ...authUserFetchHandler,
  ...authUserSessionFetchHandler,
}