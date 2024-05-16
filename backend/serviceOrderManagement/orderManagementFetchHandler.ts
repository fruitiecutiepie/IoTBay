import { FetchHandler } from "..";
import { orderFetchHandler} from "./fetchHandlers/Order"; 
import { orderItemFetchHandler } from "./fetchHandlers/OrderItem";

//MANAGES ALL FETCHHANDLERS 
export const orderManagementFetchHandler: FetchHandler = {
    ...orderFetchHandler, 
    ...orderItemFetchHandler,
  }