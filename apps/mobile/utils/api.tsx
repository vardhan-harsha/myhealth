import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@myhealth/api";

export const trpc = createTRPCReact<AppRouter>();
