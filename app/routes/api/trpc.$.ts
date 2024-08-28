import { createAPIFileRoute } from "@tanstack/start/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "../../server/_app";
import { createContext } from "../../server/trpc";

function trpcHandler({ request }: { request: Request }) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req: request,
		router: appRouter,
		createContext,
	});
}

export const Route = createAPIFileRoute("/api/trpc/$")({
	GET: trpcHandler,
	POST: trpcHandler,
	PUT: trpcHandler,
	DELETE: trpcHandler,
	PATCH: trpcHandler,
	OPTIONS: trpcHandler,
	HEAD: trpcHandler,
});
