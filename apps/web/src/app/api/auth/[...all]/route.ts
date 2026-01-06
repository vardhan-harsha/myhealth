import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@myhealth/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
