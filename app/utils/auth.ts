import { createServerFn } from "@tanstack/start";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { getSession } from "vinxi/http";
import type { SessionConfig } from "vinxi/http";
import { createAuthenticatedTRPCClient } from "./trpc";

export interface SessionData {
	rootKey: string;
	userId: string;
}

export const sessionConfig = {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, turbo/no-undeclared-env-vars
	password: "oCnWs1/ceQz1jBUO3F7QonGphsZ/Cx1/9m0nUFnSvA0=",
} satisfies SessionConfig;

export const getSessionData = async () => {
	const session = await getSession<SessionData>(sessionConfig);
	return session.data;
};

export const getCurrentUser = createServerFn("GET", async () => {
	const session = await getSessionData();
	return session.userId;
});

export const getTRPCClientOptions = createServerFn("GET", async () => {
	const session = await getSessionData();
	const url = `http://localhost:3000/api/trpc`;
	return {
		clientHeaders: {
			"x-root-key": session.rootKey,
		},
		clientUrl: url,
	};
});

export const getTrpcServer = async () => {
	const trpcOptions = await getTRPCClientOptions();

	const trpcServer = createServerSideHelpers({
		client: createAuthenticatedTRPCClient(
			trpcOptions.clientUrl,
			trpcOptions.clientHeaders
		),
	});

	return trpcServer;
};
