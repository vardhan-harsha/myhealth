import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import { getApiUrl } from "./api-url";

export const authClient = createAuthClient({
    baseURL: getApiUrl(),
    fetchOptions: {
        headers: {
            "Origin": Linking.createURL('/'), // Dynamically set Origin to match environment (helix:// or exp://)
        }
    },
    plugins: [
        expoClient({
            scheme: "helix",
            storage: SecureStore,
        })
    ]
});

export const { useSession, signOut, signIn, signUp } = authClient;
