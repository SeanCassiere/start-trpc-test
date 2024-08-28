import type { HTTPBatchLinkOptions } from "@trpc/client";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import * as SUPERJSON from "superjson";
import type { AppRouter } from "../server/_app";

export const trpc = createTRPCReact<AppRouter>();

export const createAuthenticatedTRPCClient = (
	url: string,
	headers: HTTPBatchLinkOptions<any>["headers"]
) =>
	trpc.createClient({
		links: [
			httpBatchLink({
				headers,
				transformer: SUPERJSON,
				url,
			}),
		],
	});
