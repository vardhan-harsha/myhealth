import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@helix/api";

export const trpc = createTRPCReact<AppRouter>();
