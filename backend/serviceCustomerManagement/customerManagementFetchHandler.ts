import {  customerFetchHandler } from './fetchHandlers/customerManagementFetchHandler';
import { FetchHandler } from "..";

export const customerManagementFetchHandler: FetchHandler = {
      ...customerFetchHandler
};