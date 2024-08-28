import * as React from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { Link } from "@tanstack/react-router";
import { getTRPCClientOptions } from "../utils/auth";
import { createAuthenticatedTRPCClient, trpc } from "../utils/trpc";

export interface RootRouteContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
	meta: () => [
		{
			charSet: "utf-8",
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1",
		},
		{
			title: "TanStack Start Starter",
		},
	],
	component: RootComponent,
	beforeLoad: async () => {
		const trpcClientOptions = await getTRPCClientOptions();
		return { trpcClientOptions };
	},
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function TRPCProvider(
	props: Readonly<{
		children: React.ReactNode;
	}>
) {
	const { clientHeaders, clientUrl } = Route.useRouteContext({
		select: (data) => data.trpcClientOptions,
	});
	const trpcClient = createAuthenticatedTRPCClient(clientUrl, clientHeaders);
	const queryClient = useQueryClient();

	return (
		<React.Fragment>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				{props.children}
			</trpc.Provider>
		</React.Fragment>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<Html>
			<Head>
				<Meta />
			</Head>
			<Body>
				<TRPCProvider>
					<nav>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/about'>About</Link>
							</li>
						</ul>
					</nav>
					{children}
				</TRPCProvider>
				<ScrollRestoration />
				<Scripts />
			</Body>
		</Html>
	);
}
