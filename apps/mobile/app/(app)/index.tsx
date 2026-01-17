import { View, Text } from 'react-native';
import { Button } from '../../components/ui/button';
import { ButtonText } from '../../components/ui/text';
import { authClient } from '@helix/auth/client';

export default function DashboardScreen() {
    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <View className="flex-1 bg-background items-center justify-center p-6 gap-4">
            <Text className="text-3xl font-bold text-foreground">Dashboard</Text>
            <Text className="text-muted-foreground text-center">
                You're successfully authenticated!
            </Text>
            <Button onPress={handleSignOut} variant="outline" className="mt-4">
                <ButtonText className="text-foreground">Sign Out</ButtonText>
            </Button>
        </View>
    );
}
