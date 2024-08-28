import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<React.Fragment>
			<div>
				<h1>Home</h1>
				<p>Welcome to the home page!</p>
			</div>
		</React.Fragment>
	);
}
