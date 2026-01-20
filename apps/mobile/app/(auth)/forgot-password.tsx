import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthCarousel } from '../../components/auth/AuthCarousel';
import { AuthForm } from '../../components/auth/AuthForm';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
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
                        mode="forgot-password"
                        onSuccess={() => router.replace('/(auth)/login')}
                        onSwitchMode={(mode) => {
                            if (mode === 'login') router.push('/(auth)/login');
                            if (mode === 'signup') router.push('/(auth)/signup');
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
