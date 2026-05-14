import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Heart, Activity, Weight, Moon, Footprints, Droplets, Thermometer, Wind, ArrowLeft, Download, Upload } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VitalsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#F1EEF5]" edges={['top']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View className="flex-row justify-between items-center mb-8">
                    <TouchableOpacity className="w-12 h-12 bg-transparent rounded-full items-center justify-center border border-gray-300">
                        <ArrowLeft size={20} color="#1A1A1A" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <View className="flex-row gap-2">
                        <TouchableOpacity className="w-12 h-12 bg-transparent rounded-full items-center justify-center border border-gray-300">
                            <Download size={20} color="#1A1A1A" strokeWidth={2.5} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-12 h-12 bg-transparent rounded-full items-center justify-center border border-gray-300">
                            <Upload size={20} color="#1A1A1A" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Title */}
                <Text className="text-[32px] leading-9 font-black text-[#1A1A1A] mb-8 tracking-tight">
                    Diagnostics
                </Text>

                {/* Heartbeat Card (Light Blue) */}
                <View className="bg-[#9BC5FE] rounded-[32px] p-6 mb-4 shadow-sm relative overflow-hidden">
                    <View className="flex-row items-center gap-3 mb-6">
                        <View className="w-8 h-8 bg-white/40 rounded-full items-center justify-center">
                            <Activity size={16} color="#1A1A1A" strokeWidth={3} />
                        </View>
                        <Text className="text-gray-900 font-bold text-[17px]">Heartbeat</Text>
                        <TouchableOpacity className="ml-auto">
                            <Text className="text-gray-900/40 font-bold tracking-widest leading-4">...</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View className="flex-row items-baseline gap-2 mb-6">
                        <Text className="text-[42px] font-black text-gray-900 tracking-tighter">82</Text>
                        <Text className="text-[13px] font-bold text-gray-900/60 pb-2">bpm</Text>
                    </View>
                    
                    {/* Simulated EKG Line */}
                    <View className="h-16 w-full flex-row items-center justify-center relative">
                        <View className="absolute w-full h-[1px] bg-gray-900/20" />
                        <View className="absolute left-[30%] w-[1px] h-full bg-gray-900/10" />
                        <View className="absolute right-[30%] w-[1px] h-full bg-gray-900/10" />
                        
                        {/* EKG Path placeholder */}
                        <View className="flex-row items-center h-full w-full justify-around z-10 px-2">
                            <View className="w-6 h-[2px] bg-gray-900" />
                            <View className="w-2 h-4 bg-gray-900 transform rotate-45 -ml-1" />
                            <View className="w-2 h-10 bg-gray-900 transform -rotate-75" />
                            <View className="w-2 h-12 bg-gray-900 transform rotate-75" />
                            <View className="w-2 h-4 bg-gray-900 transform -rotate-45 -mr-1" />
                            <View className="w-12 h-[2px] bg-gray-900" />
                            <View className="w-2 h-3 bg-gray-900 transform rotate-45 -ml-1" />
                            <View className="w-2 h-8 bg-gray-900 transform -rotate-75" />
                            <View className="w-2 h-10 bg-gray-900 transform rotate-75" />
                            <View className="w-2 h-3 bg-gray-900 transform -rotate-45 -mr-1" />
                            <View className="w-6 h-[2px] bg-gray-900" />
                        </View>
                        
                        {/* Scan Highlight Box */}
                        <View className="absolute right-[20%] w-16 h-20 bg-white/30 rounded-2xl border border-white/50" />
                    </View>
                </View>

                {/* Interval Card (Pale Green) */}
                <View className="bg-[#D3F5C3] rounded-[32px] p-6 mb-4 shadow-sm">
                    <View className="flex-row items-center gap-3 mb-6">
                        <View className="w-8 h-8 bg-white/60 rounded-full items-center justify-center">
                            <Activity size={16} color="#1A1A1A" strokeWidth={3} />
                        </View>
                        <Text className="text-gray-900 font-bold text-[17px]">851 ms</Text>
                        <TouchableOpacity className="ml-auto">
                            <Text className="text-gray-900/40 font-bold tracking-widest leading-4">...</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text className="text-[12px] font-bold text-gray-900/60 mb-6">R-R interval</Text>
                    
                    {/* Interval Chart Placeholder */}
                    <View className="h-12 w-full flex-row items-end justify-between px-2">
                        {['851 ms', '841 ms', '871 ms', '881 ms'].map((label, index) => (
                            <View key={index} className="items-center">
                                <View className={`w-[2px] rounded-full mb-2 ${index === 0 ? 'h-10 bg-gray-900' : index === 1 ? 'h-8 bg-gray-900/40' : index === 2 ? 'h-12 bg-gray-900/40' : 'h-10 bg-gray-900/40'}`} />
                                <Text className="text-[10px] font-bold text-gray-900/60">{label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Results Card (White) */}
                <View className="bg-white rounded-[32px] p-6 shadow-sm flex-row items-center">
                    <View className="w-16 h-16 rounded-full bg-[#9BC5FE]/20 items-center justify-center mr-4 border-[6px] border-[#F1EEF5]">
                        <View className="w-10 h-10 rounded-full bg-[#9BC5FE]" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-900 font-bold text-[17px] mb-1">Results</Text>
                        <Text className="text-[12px] font-bold text-gray-400 mb-3">You are calm and ready!</Text>
                        
                        <View className="flex-row gap-3">
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-2 h-2 rounded-full bg-[#FBC565]" />
                                <Text className="text-[11px] font-bold text-gray-900">Stress</Text>
                            </View>
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-2 h-2 rounded-full bg-[#9BC5FE]" />
                                <Text className="text-[11px] font-bold text-gray-900">Recovery</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity className="self-start">
                        <Text className="text-gray-400 font-bold">ⓘ</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
