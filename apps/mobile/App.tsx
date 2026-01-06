import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/api';
import superjson from 'superjson';
import Constants from 'expo-constants';

// Get API URL from environment configuration
const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${apiUrl}/api/trpc`,
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <Text>Oreyy Anjaneyulu (tRPC Active)</Text>
          <TestTrpc />
          <StatusBar style="auto" />
        </View>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function TestTrpc() {
  const hello = trpc.post.hello.useQuery({ text: "from Mobile" });
  if (hello.isLoading) return <Text>Loading...</Text>;
  if (hello.error) return <Text>Error: {hello.error.message}</Text>;
  return <Text>{hello.data?.greeting}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
