import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@helix/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
