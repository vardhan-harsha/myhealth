import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { ButtonText } from '~/components/ui/text';
import { signOut } from '~/lib/auth-client';
import {
    User,
    Mail,
    Bell,
    Lock,
    Moon,
    Globe,
    HelpCircle,
    FileText,
    Shield,
    ChevronRight,
    LogOut,
} from 'lucide-react-native';

// Settings sections
const accountSettings = [
    { id: 1, title: 'Personal Information', icon: User, color: '#7033ff' },
    { id: 2, title: 'Email & Password', icon: Mail, color: '#3276e4' },
    { id: 3, title: 'Notifications', icon: Bell, color: '#fd822b' },
    { id: 4, title: 'Privacy & Security', icon: Lock, color: '#4ac885' },
];

const appSettings = [
    { id: 1, title: 'Theme', icon: Moon, color: '#7033ff', value: 'Light' },
    { id: 2, title: 'Language', icon: Globe, color: '#3276e4', value: 'English' },
];

const supportSettings = [
    { id: 1, title: 'Help Center', icon: HelpCircle, color: '#7033ff' },
    { id: 2, title: 'Terms of Service', icon: FileText, color: '#3276e4' },
    { id: 3, title: 'Privacy Policy', icon: Shield, color: '#4ac885' },
];

export default function ProfileScreen() {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
            <View className="gap-6">
                {/* Header */}
                <View className="gap-2">
                    <Text className="text-3xl font-bold text-foreground">Profile</Text>
                    <Text className="text-base text-muted-foreground">
                        Manage your account and preferences
                    </Text>
                </View>

                {/* User Info Card */}
                <Card>
                    <CardHeader>
                        <View className="flex-row items-center gap-4">
                            <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center">
                                <User size={32} color="#7033ff" />
                            </View>
                            <View>
                                <CardTitle>Health User</CardTitle>
                                <Text className="text-sm text-muted-foreground">
                                    health.user@example.com
                                </Text>
                            </View>
                        </View>
                    </CardHeader>
                </Card>

                {/* Account Settings */}
                <View className="gap-4">
                    <Text className="text-xl font-semibold text-foreground">Account</Text>
                    {accountSettings.map((setting) => {
                        const Icon = setting.icon;
                        return (
                            <TouchableOpacity key={setting.id} activeOpacity={0.7}>
                                <Card>
                                    <CardHeader>
                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center gap-3">
                                                <View
                                                    className="w-10 h-10 rounded-full items-center justify-center"
                                                    style={{
                                                        backgroundColor: `${setting.color}20`,
                                                    }}
                                                >
                                                    <Icon size={20} color={setting.color} />
                                                </View>
                                                <Text className="text-base font-medium text-foreground">
                                                    {setting.title}
                                                </Text>
                                            </View>
                                            <ChevronRight size={20} color="#747474" />
                                        </View>
                                    </CardHeader>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* App Settings */}
                <View className="gap-4">
                    <Text className="text-xl font-semibold text-foreground">
                        App Settings
                    </Text>
                    {appSettings.map((setting) => {
                        const Icon = setting.icon;
                        return (
                            <TouchableOpacity key={setting.id} activeOpacity={0.7}>
                                <Card>
                                    <CardHeader>
                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center gap-3">
                                                <View
                                                    className="w-10 h-10 rounded-full items-center justify-center"
                                                    style={{
                                                        backgroundColor: `${setting.color}20`,
                                                    }}
                                                >
                                                    <Icon size={20} color={setting.color} />
                                                </View>
                                                <Text className="text-base font-medium text-foreground">
                                                    {setting.title}
                                                </Text>
                                            </View>
                                            <View className="flex-row items-center gap-2">
                                                <Text className="text-sm text-muted-foreground">
                                                    {setting.value}
                                                </Text>
                                                <ChevronRight size={20} color="#747474" />
                                            </View>
                                        </View>
                                    </CardHeader>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Support */}
                <View className="gap-4">
                    <Text className="text-xl font-semibold text-foreground">Support</Text>
                    {supportSettings.map((setting) => {
                        const Icon = setting.icon;
                        return (
                            <TouchableOpacity key={setting.id} activeOpacity={0.7}>
                                <Card>
                                    <CardHeader>
                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center gap-3">
                                                <View
                                                    className="w-10 h-10 rounded-full items-center justify-center"
                                                    style={{
                                                        backgroundColor: `${setting.color}20`,
                                                    }}
                                                >
                                                    <Icon size={20} color={setting.color} />
                                                </View>
                                                <Text className="text-base font-medium text-foreground">
                                                    {setting.title}
                                                </Text>
                                            </View>
                                            <ChevronRight size={20} color="#747474" />
                                        </View>
                                    </CardHeader>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Sign Out Button */}
                <Button
                    onPress={handleSignOut}
                    variant="outline"
                    className="mt-4 border-destructive"
                >
                    <View className="flex-row items-center gap-2">
                        <LogOut size={20} color="#dc2626" />
                        <ButtonText className="text-destructive">Sign Out</ButtonText>
                    </View>
                </Button>

                {/* Version Info */}
                <Text className="text-center text-sm text-muted-foreground">
                    MyHealth v1.0.0
                </Text>
            </View>
        </ScrollView>
    );
}
