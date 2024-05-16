import { FetchHandler } from "../..";
import { Order,OrderGet, OrderGetAll, OrderInsertOrUpdate, OrderDelete, OrderDeleteSpecific } from "../sql/Order";

type ReqBody = {
  Order: Order | undefined;
  orderId: string | undefined;
  event: "add" | "delete"| "deleteSpecific";
}

export const orderFetchHandler: FetchHandler = {
    "/order": {
      GET: async (req: Request, headers: Headers) => {
        const url = new URL(req.url);
        const orderId = url.searchParams.get("id");
  
        // Fetch all orders if no ID is provided
        if (!orderId) {
          const allOrders = await OrderGetAll(); // Assume fetches all orders
          return Promise.resolve(
            new Response(JSON.stringify(allOrders), { status: 200, headers })
          );
        }
  
        // Fetch order by ID
        const order = await OrderGet(orderId);
        return Promise.resolve(
          new Response(JSON.stringify(order), { status: 200, headers })
        );
      },
  
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      console.error("reqBody.event:", reqBody.event);
      if (reqBody.event === "delete") {
        const url = new URL(req.url);
          await OrderDelete();
          return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      ); 
      } 
        else if (reqBody.event==="deleteSpecific" && reqBody.orderId){
        await OrderDeleteSpecific(reqBody.orderId);
        return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      ); 
        }
      else {
        if (!reqBody.Order) {
          console.error(`/order: order data is required`);
          return Promise.resolve(
            new Response(undefined, { status: 400, headers })
          );
        }
        const order = await OrderInsertOrUpdate(reqBody.Order);
        return Promise.resolve(
          new Response(JSON.stringify(order), { status: 200, headers })
        );
      }
        
    },
    PUT: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.Order) {
        console.error(`/order: order update data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const updatedOrder = await OrderInsertOrUpdate(reqBody.Order);
      return Promise.resolve(
        new Response(JSON.stringify(updatedOrder), { status: 200, headers })
      );
    },
    DELETE: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      await OrderDelete;
      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}