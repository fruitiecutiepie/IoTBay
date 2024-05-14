
import { FetchHandler } from "../..";
import { Customer, customerGet, customerInsertOrUpdate, customerDelete, customerGetAll } from "../sql/customerQueries";

type ReqBody = {
  customer: Customer | undefined;
}

export const customerFetchHandler: FetchHandler = {
  "/customer": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");

      // Fetch all customers if no ID is provided
      if (!id) {
        const allCustomers = await customerGetAll(); // Assume customerGetAll fetches all customers
        return Promise.resolve(
          new Response(JSON.stringify(allCustomers), { status: 200, headers })
        );
      }

      // Fetch customer by ID
      const customer = await customerGet(id);
      return Promise.resolve(
        new Response(JSON.stringify(customer), { status: 200, headers })
      );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.customer) {
        console.error(`/customer: Customer data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const customer = await customerInsertOrUpdate(reqBody.customer);
      return Promise.resolve(
        new Response(JSON.stringify(customer), { status: 200, headers })
      );
    },
    PUT: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.customer) {
        console.error(`/customer: Customer update data is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      const updatedCustomer = await customerInsertOrUpdate(reqBody.customer);
      return Promise.resolve(
        new Response(JSON.stringify(updatedCustomer), { status: 200, headers })
      );
    },
    DELETE: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      if (!id) {
        console.error(`/customer: ID is required to delete`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
      await customerDelete(id);
      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}