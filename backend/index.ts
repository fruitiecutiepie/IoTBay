import { Server, serve } from "bun";

import { initDb } from "./db/initDb";
import { userSessionFetchHandler } from "./serviceUserSession/userSessionFetchHandler";

const SERVER_PORT = 46822;

export type FetchHandler = {
  [route: string]: {
    [key: string]: (req: Request, headers: Headers) => Promise<Response>;
  };
};

const fetchHandlers: FetchHandler = {
  ...userSessionFetchHandler,
};

(() => {
  initDb();
  serve({
    port: SERVER_PORT,
    fetch: async (req: Request, server: Server) => {
      const headers = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  // Allows requests from any origin
      });

      // Handle preflight requests for CORS
      if (req.method === "OPTIONS") {
        headers.set("Access-Control-Allow-Methods", "POST");
        headers.set("Access-Control-Allow-Headers", "Content-Type");
        headers.set("Access-Control-Max-Age", "3600");
        return new Response(undefined, { status: 204, headers });
      }
      
      const url = new URL(req.url);

      const fetchHandler = fetchHandlers[url.pathname];
      if (!fetchHandler) {
        return new Response("Not Found", { status: 404, headers });
      }

      const handler = fetchHandler[req.method];
      if (!handler) {
        return new Response("Method Not Allowed", { status: 405, headers });
      }

      const res = await handler(req, headers);
      if (!res) {
        return new Response("Internal Server Error", { status: 500, headers });
      }

      return res;
    },
  })
  console.log(`Listening on http://localhost:${SERVER_PORT} ...`);
})();