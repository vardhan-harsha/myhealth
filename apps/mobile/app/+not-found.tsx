import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <View className="flex-1 bg-background items-center justify-center p-6 gap-4">
            <Text className="text-3xl font-bold text-foreground">404</Text>
            <Text className="text-muted-foreground text-center">
                This screen doesn't exist.
            </Text>
            <Link href="/(app)" className="text-primary underline">
                Go to home screen
            </Link>
        </View>
    );
}
