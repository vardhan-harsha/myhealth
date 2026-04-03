import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Heart, Activity, Footprints, Moon, Flame, Search, ChevronRight, Play } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#F1EEF5]" edges={['top']}>
            <ScrollView 
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center gap-3">
                        <Image 
                            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                            className="w-12 h-12 rounded-full"
                        />
                        <View>
                            <Text className="text-[17px] font-bold text-gray-900">Hello, Sandra</Text>
                            <Text className="text-[13px] text-gray-500 font-medium">Today 25 Nov.</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm">
                        <Search size={20} color="#1A1A1A" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                {/* Daily Challenge Card (Purple) */}
                <View className="bg-[#A491F6] rounded-[32px] p-6 mb-8 shadow-sm h-[180px] relative overflow-hidden">
                    <View className="z-10 h-full justify-between w-2/3">
                        <View>
                            <Text className="text-[32px] leading-9 font-black text-[#1A1A1A] mb-1 tracking-tight">
                                Daily{'\n'}challenge
                            </Text>
                            <Text className="text-[#1A1A1A]/70 text-[12px] font-bold mt-1">
                                Do your plan before 09:00 AM
                            </Text>
                        </View>
                        
                        <View className="flex-row items-center mt-auto">
                            <View className="flex-row -space-x-2">
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=5' }} className="w-8 h-8 rounded-full border-2 border-[#A491F6]" />
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} className="w-8 h-8 rounded-full border-2 border-[#A491F6]" />
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} className="w-8 h-8 rounded-full border-2 border-[#A491F6]" />
                                <View className="w-8 h-8 rounded-full border-2 border-[#A491F6] bg-[#7D6BCA] items-center justify-center z-10">
                                    <Text className="text-white text-[11px] font-bold">+4</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    {/* Placeholder for 3D art on the right */}
                    <View className="absolute -right-4 -top-2 w-[160px] h-[160px] bg-transparent items-center justify-center z-0">
                        <View className="absolute right-10 top-0 w-20 h-20 bg-[#FBC565] rounded-full border-[10px] border-[#DDAA55]" />
                        <View className="absolute right-0 bottom-8 w-16 h-16 bg-[#4A4A4A] rounded-[24px] transform rotate-12" />
                        <View className="absolute right-12 bottom-4 w-14 h-14 bg-[#D1C6C0] rounded-[16px] transform -rotate-12" />
                        <View className="absolute right-2 top-8 w-16 h-16 bg-[#2B2B2B] rounded-full border-[12px] border-[#1A1A1A]" />
                    </View>
                </View>

                {/* Date Scroller */}
                <View className="flex-row justify-between mb-8 bg-white/50 p-2 rounded-[32px]">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                        const date = 22 + index;
                        const isSelected = day === 'Wed';
                        return (
                            <View 
                                key={day} 
                                className={`items-center justify-center py-3 w-[44px] rounded-[24px] ${isSelected ? 'bg-[#1A1A1A] shadow-md' : 'bg-transparent'}`}
                            >
                                <View className={`w-1 h-1 rounded-full mb-1.5 ${isSelected ? 'bg-white' : 'bg-gray-400/50'}`} />
                                <Text className={`text-[12px] font-medium mb-1 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                                    {day}
                                </Text>
                                <Text className={`text-[16px] font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                    {date}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Your Plan Title */}
                <Text className="text-[24px] font-bold text-gray-900 mb-6">
                    Your plan
                </Text>

                {/* Plan Cards Container */}
                <View className="flex-row justify-between h-[340px]">
                    
                    {/* Left Tall Card (Orange) */}
                    <View className="w-[48%] bg-[#FBC565] rounded-[32px] p-5 pb-6 justify-between shadow-sm">
                        <View>
                            <View className="bg-white/30 self-start px-3 py-1.5 rounded-full mb-4">
                                <Text className="text-gray-900 text-[12px] font-bold">Medium</Text>
                            </View>
                            <Text className="text-[24px] leading-8 font-bold text-gray-900 mb-4 pr-4 tracking-tight">
                                Yoga{'\n'}Group
                            </Text>
                            <View className="gap-0.5 mb-2">
                                <Text className="text-gray-900/80 font-medium text-[13px]">25 Nov.</Text>
                                <Text className="text-gray-900/80 font-medium text-[13px]">14:00–15:00</Text>
                                <Text className="text-gray-900/80 font-medium text-[13px]">A5 room</Text>
                            </View>
                        </View>
                        
                        <View className="flex-row items-center gap-3">
                            <Image 
                                source={{ uri: 'https://i.pravatar.cc/150?img=47' }} 
                                className="w-10 h-10 rounded-full border border-white/20"
                            />
                            <View>
                                <Text className="text-gray-900/60 text-[11px] font-bold">Trainer</Text>
                                <Text className="text-gray-900 text-[13px] font-bold">Tiffany Way</Text>
                            </View>
                        </View>
                    </View>

                    {/* Right Side Column */}
                    <View className="w-[48%] justify-between gap-4">
                        
                        {/* Top Small Card (Light Blue) */}
                        <View className="bg-[#9BC5FE] rounded-[32px] p-5 flex-1 relative overflow-hidden shadow-sm">
                            <View className="z-10 h-full">
                                <View className="bg-white/30 self-start px-3 py-1.5 rounded-full mb-3">
                                    <Text className="text-gray-900 text-[12px] font-bold">Light</Text>
                                </View>
                                <Text className="text-[24px] leading-7 font-bold text-gray-900 mb-2 tracking-tight">
                                    Balance
                                </Text>
                                <View className="gap-0.5">
                                    <Text className="text-gray-900/80 font-medium text-[12px]">28 Nov.</Text>
                                    <Text className="text-gray-900/80 font-medium text-[12px]">18:00–19:30</Text>
                                    <Text className="text-gray-900/80 font-medium text-[12px]">A2 room</Text>
                                </View>
                            </View>
                            
                            {/* Dummy shapes placeholder to mimic 3D art */}
                            <View className="absolute bottom-[-10px] -right-4 w-[100px] h-[100px] z-0">
                                <View className="absolute bottom-0 right-4 w-16 h-16 bg-[#E0CAA2] rounded-full shadow-lg" />
                                <View className="absolute bottom-2 right-12 w-10 h-10 bg-[#54978D] rounded-full shadow-md" />
                            </View>
                        </View>

                        {/* Bottom Action Card (Pink) */}
                        <View className="bg-[#FDA2F8] rounded-[32px] p-4 flex-row items-center justify-between h-[80px] px-5 shadow-sm">
                            <TouchableOpacity className="w-10 h-10 bg-white/40 rounded-[14px] items-center justify-center">
                                <View className="w-[18px] h-[18px] rounded-[6px] border-[2.5px] border-white items-center justify-center">
                                    <View className="w-1.5 h-1.5 bg-white rounded-full" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className="w-10 h-10 bg-white/40 rounded-[14px] items-center justify-center pl-1">
                                <Play size={18} color="#fff" fill="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-10 h-10 bg-white/40 rounded-[14px] items-center justify-center">
                                <Activity size={20} color="#fff" strokeWidth={3} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
