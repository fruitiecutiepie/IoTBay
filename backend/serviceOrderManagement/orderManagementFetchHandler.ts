import { createOrder } from "./fetchHandlers/createOrder";
import { getOrderDetails } from "./fetchHandlers/getOrderDetails";
import { getOrderHistory } from "./fetchHandlers/getOrderHistory";
import { searchOrders } from "./fetchHandlers/searchOrders";
import { updateOrder } from "./fetchHandlers/updateOrder";
import { cancelOrder } from "./fetchHandlers/cancelOrder";

export const orderManagementFetchHandler = {
  createOrder,
  getOrderDetails,
  getOrderHistory,
  searchOrders,
  updateOrder,
  cancelOrder,
};
