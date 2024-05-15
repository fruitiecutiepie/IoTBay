import { FetchHandler } from "../..";
import { Payments, paymentGetAll, paymentsInsertOrUpdate } from "../sql/Payments";

type ReqBody = {
  Payments: Payments | undefined;
}

export const paymentsFetchHandler: FetchHandler = {
  "/payments": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
        const allCustomers = await paymentGetAll(); 
        return Promise.resolve(
          new Response(JSON.stringify(allCustomers), { status: 200, headers })
        );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.Payments) {
        console.error(`/payments: carddetail data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const customer = await paymentsInsertOrUpdate(reqBody.Payments);
      return Promise.resolve(
        new Response(JSON.stringify(customer), { status: 200, headers })
      );
    },
    PUT: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.Payments) {
        console.error(`/payments: payment update data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const updatedCustomer = await paymentsInsertOrUpdate(reqBody.Payments);
      return Promise.resolve(
        new Response(JSON.stringify(updatedCustomer), { status: 200, headers })
      );
    },
  }
}