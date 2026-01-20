import '../global.css';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '../utils/api';
import superjson from 'superjson';
import { getApiUrl } from '../lib/api-url';

export default function RootLayout() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => {
        try {
            const apiUrl = getApiUrl();
            const trpcUrl = `${apiUrl}/api/trpc`;
            console.log('🔗 Creating tRPC client with URL:', trpcUrl);

            return trpc.createClient({
                links: [
                    httpBatchLink({
                        url: trpcUrl,
                        transformer: superjson,
                        fetch: (url, options) => {
                            console.log('🌐 Fetching:', url);
                            return fetch(url, options);
                        },
                        headers: () => ({
                            'Content-Type': 'application/json',
                        }),
                    }),
                ],
            });
        } catch (error) {
            console.error('❌ Failed to create tRPC client:', error);
            throw error;
        }
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Slot />
                <StatusBar style="auto" />
            </QueryClientProvider>
        </trpc.Provider>
    );
}
