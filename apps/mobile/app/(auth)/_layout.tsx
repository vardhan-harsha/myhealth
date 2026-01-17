import { Redirect, Stack } from 'expo-router';
import { useSession } from '@helix/auth/client';
import { View, ActivityIndicator } from 'react-native';

export default function AuthLayout() {
    const { data: session, isPending } = useSession();

    // Show loading state while checking session
    if (isPending) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Redirect to app if already authenticated
    if (session) {
        return <Redirect href="/(app)" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        />
    );
}
