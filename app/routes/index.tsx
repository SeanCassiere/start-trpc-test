import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../utils/trpc";
import { createServerFn } from "@tanstack/start";
import { getTrpcServer } from "../utils/auth";

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => loaderFn(),
});

const loaderFn = createServerFn("GET", async () => {
	const server = await getTrpcServer();
	const res = await server.greeting.fetch();
	return res;
});

function Home() {
	const [greetingData] = trpc.greeting.useSuspenseQuery();
	const [clientGreeting] = trpc.clientGreeting.useSuspenseQuery();

	return (
		<React.Fragment>
			<div>
				<h1>Home</h1>
				<p>Welcome to the home page!</p>
				<p>Server data says: {greetingData}</p>
				<p>Client data says: {clientGreeting}</p>
				<p>
					Client data isn't really working though... It ALL seems to be
					happening from the server
				</p>
			</div>
		</React.Fragment>
	);
}
