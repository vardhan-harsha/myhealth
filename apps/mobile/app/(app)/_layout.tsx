import { Redirect, Stack } from 'expo-router';
import { useSession } from '~/lib/auth-client';
import { View, ActivityIndicator } from 'react-native';

export default function AppLayout() {
    const { data: session, isPending } = useSession();

    // Show loading state while checking session
    if (isPending) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Redirect to login if not authenticated
    if (!session) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
