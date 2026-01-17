import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@helix/auth";

const handler = toNextJsHandler(auth.handler);

export const GET = handler.GET;
export const POST = async (req: Request) => {
    console.log("🔒 Auth Request Headers:", {
        origin: req.headers.get("origin"),
        host: req.headers.get("host"),
        referer: req.headers.get("referer"),
    });
    return handler.POST(req);
};
