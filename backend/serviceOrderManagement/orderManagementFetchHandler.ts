import { FetchHandler } from "..";
import { orderFetchHandler} from "./fetchHandlers/Order"; 
import { orderItemFetchHandler } from "./fetchHandlers/OrderItem";

export const orderManagementFetchHandler: FetchHandler = {
    ...orderFetchHandler, 
    ...orderItemFetchHandler,
  }