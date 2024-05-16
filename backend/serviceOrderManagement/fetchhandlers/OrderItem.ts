import { FetchHandler } from "../..";
import { OrderItem ,OrderItemGet, OrderItemGetAll, OrderItemInsertOrUpdate, OrderItemDelete } from "../sql/OrderItem";

type ReqBody = {
  OrderItem: OrderItem | undefined;
  itemId: string | undefined;
  event: "add" | "delete";
}

export const orderItemFetchHandler: FetchHandler = {
    "/OrderItem": {
      GET: async (req: Request, headers: Headers) => {
        const url = new URL(req.url);
        const orderItemId = url.searchParams.get("itemId");
  
        // Fetch all items if no ID is provided
        if (!orderItemId) {
          const allOrderItems = await OrderItemGetAll(); // Assume fetches all items
          return Promise.resolve(
            new Response(JSON.stringify(allOrderItems), { status: 200, headers })
          );
        }
  
        // Fetch order by ID
        const orderItem = await OrderItemGet(orderItemId);
        return Promise.resolve(
          new Response(JSON.stringify(orderItem), { status: 200, headers })
        );
      },
  
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      console.error("reqBody.event:", reqBody.event);
      if (reqBody.event === "delete") {
        const url = new URL(req.url);
          await OrderItemDelete();
          return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      ); 
      } else {
        if (!reqBody.OrderItem) {
          console.error(`/order: item data is required`);
          return Promise.resolve(
            new Response(undefined, { status: 400, headers })
          );
        }
        const order = await OrderItemInsertOrUpdate(reqBody.OrderItem);
        return Promise.resolve(
          new Response(JSON.stringify(order), { status: 200, headers })
        );
      }
        
    },
    PUT: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.OrderItem) {
        console.error(`/item: item update data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const updatedOrderItem = await OrderItemInsertOrUpdate(reqBody.OrderItem);
      return Promise.resolve(
        new Response(JSON.stringify(updatedOrderItem), { status: 200, headers })
      );
    },
    DELETE: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      await OrderItemDelete;
      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}