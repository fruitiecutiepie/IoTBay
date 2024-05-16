import { FetchHandler } from "..";
import { carddetailFetchHandler} from "./fetchHandlers/CardDetails"; 
import { paymentsFetchHandler } from "./fetchHandlers/Payments"; 

export const PmoduleFetchHandler: FetchHandler = {
  ...carddetailFetchHandler, 
  ...paymentsFetchHandler,
}
