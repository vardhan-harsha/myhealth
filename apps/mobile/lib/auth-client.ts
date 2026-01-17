import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const getApiUrl = () => {
    try {
        const url = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';
        return url && url.startsWith('http') ? url : 'http://localhost:3000';
    } catch (error) {
        console.error('❌ Failed to get API URL from config:', error);
        return 'http://localhost:3000';
    }
};

export const authClient = createAuthClient({
    baseURL: getApiUrl(),
    plugins: [
        expoClient({
            scheme: "helix",
            storage: SecureStore,
        })
    ]
});

export const { useSession, signOut, signIn, signUp } = authClient;
