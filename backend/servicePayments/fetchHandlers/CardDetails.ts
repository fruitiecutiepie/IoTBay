import { FetchHandler } from "../..";
import { CardDetail, CardDetailGetAll, CardDetailInsertOrUpdate, CardDetailDelete } from "../sql/CardDetails";

type ReqBody = {
  CardDetail: CardDetail | undefined;
  creditcardnumber: number | undefined;
  event: "add" | "delete";
}

export const carddetailFetchHandler: FetchHandler = {
  "/carddetails": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
        const allCustomers = await CardDetailGetAll(); 
        return Promise.resolve(
          new Response(JSON.stringify(allCustomers), { status: 200, headers })
        );

    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      console.error("reqBody.event:", reqBody.event);
      if (reqBody.event === "delete") {
        const url = new URL(req.url);
          await CardDetailDelete();
          return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      ); 
      } else {
        if (!reqBody.CardDetail) {
          console.error(`/carddetail: carddetail data is required`);
          return Promise.resolve(
            new Response(undefined, { status: 400, headers })
          );
        }
        const customer = await CardDetailInsertOrUpdate(reqBody.CardDetail);
        return Promise.resolve(
          new Response(JSON.stringify(customer), { status: 200, headers })
        );
      }
        
    },
    PUT: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.CardDetail) {
        console.error(`/carddetails: Carddetail update data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const updatedCustomer = await CardDetailInsertOrUpdate(reqBody.CardDetail);
      return Promise.resolve(
        new Response(JSON.stringify(updatedCustomer), { status: 200, headers })
      );
    },
    DELETE: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      await CardDetailDelete;
      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}