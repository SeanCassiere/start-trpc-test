import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";
import { eventHandler, updateSession } from "vinxi/http";

import { createRouter } from "./router";
import { sessionConfig } from "./utils/auth";

export default eventHandler(async (event) => {
	const handler = createStartHandler({
		createRouter,
		getRouterManifest,
	});

	await updateSession(event, sessionConfig, {
		userId: "user_123",
		rootKey: "root-key-jack-123",
	});

	return handler(defaultStreamHandler)(event);
});
