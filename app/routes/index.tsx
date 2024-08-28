import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../utils/trpc";
import { createServerFn } from "@tanstack/start";
import { getTrpcServer } from "../utils/auth";

const loaderFn = createServerFn("GET", async () => {
	const server = await getTrpcServer();
	const res = await server.greeting.fetch();
	return res;
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => loaderFn(),
});

function Home() {
	const [data] = trpc.greeting.useSuspenseQuery();

	return (
		<React.Fragment>
			<div>
				<h1>Home</h1>
				<p>Welcome to the home page!</p>
				<p>Server data says: {data}</p>
			</div>
		</React.Fragment>
	);
}
