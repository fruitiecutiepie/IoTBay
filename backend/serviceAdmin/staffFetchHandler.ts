// CONTROLLER // Andrew's Code

import { FetchHandler } from "..";
import { userListFetchHandler } from "./fetchHandlers/staffList";
import { staffUIDFetchHandler } from "./fetchHandlers/staffUID";
import { userNumberFetchHandler } from "./fetchHandlers/userNumber";

// All the fetchhandlers need to be 'registered' in /backend/index.ts
// This file combines all the staff fetch handlers for cleaner code.
// FetchHandler is a custom helper type defined in the same index.ts.
export const staffFetchHandler: FetchHandler = {
  ...staffUIDFetchHandler,
  ...userListFetchHandler,
  ...userNumberFetchHandler
}