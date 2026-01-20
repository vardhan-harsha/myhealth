import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { authClient } from '~/lib/auth-client';
import { Button } from '../ui/button';
import { ButtonText } from '../ui/text';
import { Github, Mail } from 'lucide-react-native';
import { GoogleIcon, MicrosoftIcon } from '../ui/icons';

type AuthFormProps = {
    mode: 'login' | 'signup' | 'forgot-password';
    onSuccess: () => void;
    onSwitchMode?: (mode: 'login' | 'signup' | 'forgot-password') => void;
};

export function AuthForm({ mode, onSuccess, onSwitchMode }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isLogin = mode === 'login';
    const isSignup = mode === 'signup';
    const isForgotPassword = mode === 'forgot-password';

    const handleSubmit = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        if (!isForgotPassword && !password) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        if (isSignup && !name) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        setIsLoading(true);

        try {
            if (isForgotPassword) {
                const { error } = await authClient.requestPasswordReset({
                    email,
                    redirectTo: '/reset-password',
                });

                if (error) {
                    Alert.alert('Error', error.message ?? 'Failed to send reset email');
                } else {
                    Alert.alert(
                        'Check your email',
                        'If an account exists with that email, we\'ve sent a reset link.',
                        [{ text: 'OK', onPress: () => onSwitchMode?.('login') }]
                    );
                }
                setIsLoading(false);
                return;
            }

            let result;
            if (isLogin) {
                result = await authClient.signIn.email({ email, password });
            } else {
                result = await authClient.signUp.email({ email, password, name });
            }

            if (result?.error) {
                Alert.alert(
                    isLogin ? 'Sign in failed' : 'Sign up failed',
                    result.error.message ?? 'Please check your credentials and try again.'
                );
                setIsLoading(false);
                return;
            }

            // Success
            Alert.alert(
                isLogin ? 'Welcome back!' : 'Account created!',
                isLogin ? 'You\'ve successfully signed in.' : 'Welcome to Helix!',
                [{ text: 'OK', onPress: onSuccess }]
            );
        } catch (err: any) {
            console.error('Auth error:', err);
            Alert.alert(
                isLogin ? 'Sign in failed' : 'Sign up failed',
                err?.message ?? 'Please check your credentials and try again.'
            );
            setIsLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: 'github' | 'google' | 'microsoft') => {
        setIsLoading(true);
        try {
            const callbackURL = Linking.createURL('/');
            console.log('🔗 OAuth callback URL:', callbackURL);

            await authClient.signIn.social({
                provider,
                callbackURL,
            });
        } catch (err: any) {
            Alert.alert('OAuth sign-in failed', err?.message ?? 'Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <View className="gap-6">
            {/* Header */}
            <View className="gap-1">
                <Text className="text-2xl font-bold text-foreground">
                    {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome back' : 'Create your account'}
                </Text>
                <Text className="text-sm text-muted-foreground">
                    {isForgotPassword
                        ? 'Enter your email to receive a reset link'
                        : isLogin
                            ? 'Enter your credentials to sign in'
                            : 'Fill in the form below to create your account'}
                </Text>
            </View>

            {/* Form Fields */}
            <View className="gap-4">
                {isSignup && (
                    <View className="gap-2">
                        <Text className="text-sm font-medium text-foreground">Full Name</Text>
                        <TextInput
                            className="h-12 px-4 rounded-lg border border-input bg-background text-foreground"
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                            editable={!isLoading}
                            autoCapitalize="words"
                        />
                    </View>
                )}

                <View className="gap-2">
                    <Text className="text-sm font-medium text-foreground">Email</Text>
                    <TextInput
                        className="h-12 px-4 rounded-lg border border-input bg-background text-foreground"
                        placeholder="m@example.com"
                        value={email}
                        onChangeText={setEmail}
                        editable={!isLoading}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                </View>

                {!isForgotPassword && (
                    <View className="gap-2">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm font-medium text-foreground">Password</Text>
                            {isLogin && (
                                <Text
                                    className="text-sm text-primary underline"
                                    onPress={() => onSwitchMode?.('forgot-password')}
                                >
                                    Forgot password?
                                </Text>
                            )}
                        </View>
                        <TextInput
                            className="h-12 px-4 rounded-lg border border-input bg-background text-foreground"
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            editable={!isLoading}
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="password"
                        />
                        {isSignup && (
                            <Text className="text-xs text-muted-foreground">
                                Must be at least 8 characters long.
                            </Text>
                        )}
                    </View>
                )}

                <Button onPress={handleSubmit} disabled={isLoading} className="mt-2">
                    <ButtonText>
                        {isLoading
                            ? 'Loading...'
                            : isForgotPassword
                                ? 'Send Reset Link'
                                : isLogin
                                    ? 'Sign In'
                                    : 'Create Account'}
                    </ButtonText>
                </Button>
            </View>

            {/* Separator */}
            {!isForgotPassword && (
                <>
                    <View className="flex-row items-center gap-4">
                        <View className="flex-1 h-px bg-border" />
                        <Text className="text-sm text-muted-foreground">Or continue with</Text>
                        <View className="flex-1 h-px bg-border" />
                    </View>

                    {/* OAuth Buttons */}
                    <View className="flex-row gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onPress={() => handleOAuthSignIn('github')}
                            disabled={isLoading}
                        >
                            <Github size={20} color="currentColor" />
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onPress={() => handleOAuthSignIn('google')}
                            disabled={isLoading}
                        >
                            <GoogleIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onPress={() => handleOAuthSignIn('microsoft')}
                            disabled={isLoading}
                        >
                            <MicrosoftIcon />
                        </Button>
                    </View>
                </>
            )}

            {/* Footer Links */}
            <View className="items-center">
                <Text className="text-sm text-muted-foreground">
                    {isForgotPassword ? (
                        <>
                            <Text
                                className="text-primary underline"
                                onPress={() => onSwitchMode?.('login')}
                            >
                                Back to sign in
                            </Text>
                        </>
                    ) : isLogin ? (
                        <>
                            Don't have an account?{' '}
                            <Text
                                className="text-primary underline"
                                onPress={() => onSwitchMode?.('signup')}
                            >
                                Sign up
                            </Text>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <Text
                                className="text-primary underline"
                                onPress={() => onSwitchMode?.('login')}
                            >
                                Sign in
                            </Text>
                        </>
                    )}
                </Text>
            </View>
        </View>
    );
}
