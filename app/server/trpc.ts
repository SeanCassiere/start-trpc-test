import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create({ transformer: SuperJSON });
export const router = t.router;
export const publicProcedure = t.procedure;

export async function createContext(opts: FetchCreateContextFnOptions) {
	return opts;
}
export type Context = Awaited<ReturnType<typeof createContext>>;
