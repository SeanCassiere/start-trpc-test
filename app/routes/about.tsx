import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	const [greeting] = trpc.greeting.useSuspenseQuery();

	return (
		<React.Fragment>
			<div>
				<h1>About</h1>
				<p>Welcome to the about page!</p>
				<p>Server data says: {greeting}</p>
				<p>
					This data should be getting sent down by the queryClient from the
					server
				</p>
			</div>
		</React.Fragment>
	);
}
