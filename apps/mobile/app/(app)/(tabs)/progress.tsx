import { View, Text, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Activity, Heart, Footprints, Moon, Target } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy progress data
const progressMetrics = [
    {
        id: 1,
        title: 'Weekly Steps',
        current: '58.2k',
        change: '+11.8%',
        trend: 'up',
        icon: Footprints,
        color: '#4CAF50',
        bg: '#E7F5E8'
    },
    {
        id: 2,
        title: 'Avg Heart Rate',
        current: '68 bpm',
        change: '-5.6%',
        trend: 'down',
        icon: Heart,
        color: '#FF87AB',
        bg: '#FF87AB15'
    },
    {
        id: 3,
        title: 'Active Mins',
        current: '315 m',
        change: '+12.5%',
        trend: 'up',
        icon: Activity,
        color: '#FF922B',
        bg: '#FF922B15'
    },
    {
        id: 4,
        title: 'Sleep Quality',
        current: '7.8 hrs',
        change: '+8.3%',
        trend: 'up',
        icon: Moon,
        color: '#F5A623',
        bg: '#FEF3D5'
    },
    {
        id: 5,
        title: 'Weight',
        current: '75.5 kg',
        change: '-0.9%',
        trend: 'down',
        icon: Target,
        color: '#4A90E2',
        bg: '#D4EBF8'
    },
    {
        id: 6,
        title: 'Workouts',
        current: '5 days',
        change: '+25%',
        trend: 'up',
        icon: Activity,
        color: '#845EF7',
        bg: '#845EF715'
    },
];

// Weekly summary
const weeklySummary = [
    { day: 'Mon', value: 8234 },
    { day: 'Tue', value: 9123 },
    { day: 'Wed', value: 7456 },
    { day: 'Thu', value: 10234 },
    { day: 'Fri', value: 8932 },
    { day: 'Sat', value: 6755 },
    { day: 'Sun', value: 7500 },
];

export default function ProgressScreen() {
    const maxSteps = Math.max(...weeklySummary.map((d) => d.value));

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={['top']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-[34px] leading-10 font-bold text-gray-900 mb-2">Progress</Text>
                    <Text className="text-[17px] font-medium text-gray-500">Track your health journey</Text>
                </View>

                {/* Weekly Chart */}
                <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-8">
                    <View className="mb-6">
                        <Text className="text-gray-900 font-bold text-xl mb-1">Weekly Steps</Text>
                        <Text className="text-gray-400 text-[13px] font-medium">Daily step count this week</Text>
                    </View>
                    
                    <View className="flex-row items-end justify-between h-36 gap-2">
                        {weeklySummary.map((day) => (
                            <View key={day.day} className="flex-1 items-center gap-3">
                                <View className="flex-1 justify-end w-full">
                                    <View
                                        className="w-full rounded-full"
                                        style={{
                                            height: `${(day.value / maxSteps) * 100}%`,
                                            backgroundColor: day.value === maxSteps ? '#4CAF50' : '#E7F5E8',
                                            minHeight: 24,
                                        }}
                                    />
                                </View>
                                <Text className="text-[13px] font-semibold text-gray-400">{day.day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <Text className="text-xl font-bold text-gray-900 mb-4">Key Metrics</Text>
                
                {/* Progress Metrics Grid */}
                <View className="flex-row flex-wrap justify-between">
                    {progressMetrics.map((metric) => {
                        const Icon = metric.icon;
                        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
                        const trendColor = metric.trend === 'up' ? '#4CAF50' : '#FF6B6B';

                        return (
                            <View key={metric.id} className="w-[48%] bg-white rounded-[32px] p-5 mb-4 shadow-sm border border-gray-100">
                                <View className="flex-row justify-between items-start mb-4">
                                    <View 
                                        className="w-10 h-10 rounded-[16px] items-center justify-center"
                                        style={{ backgroundColor: metric.bg }}
                                    >
                                        <Icon size={20} color={metric.color} />
                                    </View>
                                </View>
                                <Text className="text-gray-500 text-[13px] font-medium mb-1 line-clamp-1" numberOfLines={1}>{metric.title}</Text>
                                <View className="mb-2">
                                    <Text className="text-[24px] font-black text-gray-900 tracking-tight">{metric.current}</Text>
                                </View>
                                <View className="flex-row items-center gap-1.5 mt-auto">
                                    <View className="p-1 rounded-full" style={{ backgroundColor: `${trendColor}15` }}>
                                        <TrendIcon size={12} color={trendColor} strokeWidth={3} />
                                    </View>
                                    <Text className="text-[13px] font-bold" style={{ color: trendColor }}>
                                        {metric.change}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
