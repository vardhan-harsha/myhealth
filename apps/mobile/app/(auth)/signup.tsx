import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthCarousel } from '../../components/auth/AuthCarousel';
import { AuthForm } from '../../components/auth/AuthForm';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background"
        >
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-6"
                keyboardShouldPersistTaps="handled"
            >
                <AuthCarousel />
                <View className="p-6">
                    <AuthForm
                        mode="signup"
                        onSuccess={() => router.replace('/(app)')}
                        onSwitchMode={(mode) => {
                            if (mode === 'login') router.push('/(auth)/login');
                            if (mode === 'forgot-password') router.push('/(auth)/forgot-password');
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
