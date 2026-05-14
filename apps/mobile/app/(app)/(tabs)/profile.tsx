import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button } from '~/components/ui/button';
import { ButtonText } from '~/components/ui/text';
import { signOut } from '~/lib/auth-client';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    { id: 1, title: 'Personal Information', icon: User, color: '#845EF7', bg: '#845EF715' },
    { id: 2, title: 'Email & Password', icon: Mail, color: '#4A90E2', bg: '#D4EBF8' },
    { id: 3, title: 'Notifications', icon: Bell, color: '#FF922B', bg: '#FF922B15' },
    { id: 4, title: 'Privacy & Security', icon: Lock, color: '#4CAF50', bg: '#E7F5E8' },
];

const appSettings = [
    { id: 1, title: 'Theme', icon: Moon, color: '#845EF7', bg: '#845EF715', value: 'Light' },
    { id: 2, title: 'Language', icon: Globe, color: '#4A90E2', bg: '#D4EBF8', value: 'English' },
];

const supportSettings = [
    { id: 1, title: 'Help Center', icon: HelpCircle, color: '#845EF7', bg: '#845EF715' },
    { id: 2, title: 'Terms of Service', icon: FileText, color: '#4A90E2', bg: '#D4EBF8' },
    { id: 3, title: 'Privacy Policy', icon: Shield, color: '#4CAF50', bg: '#E7F5E8' },
];

export default function ProfileScreen() {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={['top']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-[34px] leading-10 font-bold text-gray-900 mb-2">Profile</Text>
                    <Text className="text-[17px] font-medium text-gray-500">Manage your account</Text>
                </View>

                {/* User Info Card */}
                <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-8 flex-row items-center gap-5">
                    <Image 
                        source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                        className="w-[72px] h-[72px] rounded-full border-4 border-gray-50"
                    />
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-900 mb-1">Alex Johnson</Text>
                        <Text className="text-sm font-medium text-gray-500">alex.j@example.com</Text>
                    </View>
                    <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
                        <ChevronRight size={20} color="#A1A1AA" />
                    </View>
                </View>

                {/* Settings Block Wrapper */}
                <View className="gap-8">
                    
                    {/* Account Settings */}
                    <View>
                        <Text className="text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Account</Text>
                        <View className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100">
                            {accountSettings.map((setting, index) => {
                                const Icon = setting.icon;
                                return (
                                    <TouchableOpacity 
                                        key={setting.id} 
                                        activeOpacity={0.7}
                                        className={`flex-row items-center justify-between p-3 ${index !== accountSettings.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <View className="flex-row items-center gap-4">
                                            <View className="w-11 h-11 rounded-[16px] items-center justify-center" style={{ backgroundColor: setting.bg }}>
                                                <Icon size={20} color={setting.color} />
                                            </View>
                                            <Text className="text-[16px] font-bold text-gray-800">{setting.title}</Text>
                                        </View>
                                        <ChevronRight size={20} color="#D4D4D8" />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* App Settings */}
                    <View>
                        <Text className="text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Preferences</Text>
                        <View className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100">
                            {appSettings.map((setting, index) => {
                                const Icon = setting.icon;
                                return (
                                    <TouchableOpacity 
                                        key={setting.id} 
                                        activeOpacity={0.7}
                                        className={`flex-row items-center justify-between p-3 ${index !== appSettings.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <View className="flex-row items-center gap-4">
                                            <View className="w-11 h-11 rounded-[16px] items-center justify-center" style={{ backgroundColor: setting.bg }}>
                                                <Icon size={20} color={setting.color} />
                                            </View>
                                            <Text className="text-[16px] font-bold text-gray-800">{setting.title}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            <Text className="text-[15px] font-medium text-gray-400">{setting.value}</Text>
                                            <ChevronRight size={20} color="#D4D4D8" />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Support Settings */}
                    <View>
                        <Text className="text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Support</Text>
                        <View className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100 mb-6">
                            {supportSettings.map((setting, index) => {
                                const Icon = setting.icon;
                                return (
                                    <TouchableOpacity 
                                        key={setting.id} 
                                        activeOpacity={0.7}
                                        className={`flex-row items-center justify-between p-3 ${index !== supportSettings.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <View className="flex-row items-center gap-4">
                                            <View className="w-11 h-11 rounded-[16px] items-center justify-center" style={{ backgroundColor: setting.bg }}>
                                                <Icon size={20} color={setting.color} />
                                            </View>
                                            <Text className="text-[16px] font-bold text-gray-800">{setting.title}</Text>
                                        </View>
                                        <ChevronRight size={20} color="#D4D4D8" />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Sign Out Button */}
                    <TouchableOpacity
                        onPress={handleSignOut}
                        activeOpacity={0.7}
                        className="bg-[#FFF0F0] p-4 rounded-full flex-row items-center justify-center gap-2 mb-8 border border-[#FFE0E0]"
                    >
                        <LogOut size={20} color="#FF6B6B" />
                        <Text className="text-[#FF6B6B] font-bold text-[16px]">Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
