import { View, Text, ScrollView } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { TrendingUp, TrendingDown, Activity, Heart, Footprints, Moon, Target, BarChart3 } from 'lucide-react-native';

// Dummy progress data
const progressMetrics = [
    {
        id: 1,
        title: 'Weekly Steps',
        current: '58,234',
        previous: '52,100',
        change: '+11.8%',
        trend: 'up',
        icon: Footprints,
        color: '#4ac885',
    },
    {
        id: 2,
        title: 'Average Heart Rate',
        current: '68 bpm',
        previous: '72 bpm',
        change: '-5.6%',
        trend: 'down',
        icon: Heart,
        color: '#fd822b',
    },
    {
        id: 3,
        title: 'Active Minutes',
        current: '315 min',
        previous: '280 min',
        change: '+12.5%',
        trend: 'up',
        icon: Activity,
        color: '#7033ff',
    },
    {
        id: 4,
        title: 'Sleep Quality',
        current: '7.8 hrs',
        previous: '7.2 hrs',
        change: '+8.3%',
        trend: 'up',
        icon: Moon,
        color: '#3276e4',
    },
    {
        id: 5,
        title: 'Weight Progress',
        current: '75.5 kg',
        previous: '76.2 kg',
        change: '-0.9%',
        trend: 'down',
        icon: Target,
        color: '#4ac885',
    },
    {
        id: 6,
        title: 'Workout Frequency',
        current: '5 days',
        previous: '4 days',
        change: '+25%',
        trend: 'up',
        icon: Activity,
        color: '#fd822b',
    },
];

// Weekly summary
const weeklySummary = [
    { day: 'Mon', value: 8234, label: '8.2k' },
    { day: 'Tue', value: 9123, label: '9.1k' },
    { day: 'Wed', value: 7456, label: '7.5k' },
    { day: 'Thu', value: 10234, label: '10.2k' },
    { day: 'Fri', value: 8932, label: '8.9k' },
    { day: 'Sat', value: 6755, label: '6.8k' },
    { day: 'Sun', value: 7500, label: '7.5k' },
];

// Monthly goals
const monthlyGoals = [
    { id: 1, title: 'Steps Goal', current: 234567, target: 250000, unit: 'steps' },
    { id: 2, title: 'Active Days', current: 22, target: 25, unit: 'days' },
    { id: 3, title: 'Workouts', current: 18, target: 20, unit: 'sessions' },
];

export default function ProgressScreen() {
    const maxSteps = Math.max(...weeklySummary.map((d) => d.value));

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
            <View className="gap-6">
                {/* Header */}
                <View className="gap-2">
                    <Text className="text-3xl font-bold text-foreground">Progress</Text>
                    <Text className="text-base text-muted-foreground">
                        Track your health journey over time
                    </Text>
                </View>

                {/* Weekly Chart Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Steps</CardTitle>
                        <CardDescription>Daily step count this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <View className="flex-row items-end justify-between h-32 gap-2">
                            {weeklySummary.map((day) => (
                                <View key={day.day} className="flex-1 items-center gap-2">
                                    <View className="flex-1 justify-end w-full">
                                        <View
                                            className="w-full rounded-t-md"
                                            style={{
                                                height: `${(day.value / maxSteps) * 100}%`,
                                                backgroundColor: '#7033ff',
                                                minHeight: 20,
                                            }}
                                        />
                                    </View>
                                    <Text className="text-xs text-muted-foreground">{day.day}</Text>
                                </View>
                            ))}
                        </View>
                    </CardContent>
                </Card>

                {/* Progress Metrics */}
                <View className="gap-4">
                    <Text className="text-xl font-semibold text-foreground">Key Metrics</Text>
                    {progressMetrics.map((metric) => {
                        const Icon = metric.icon;
                        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
                        const trendColor = metric.trend === 'up' ? '#4ac885' : '#fd822b';

                        return (
                            <Card key={metric.id}>
                                <CardHeader>
                                    <View className="flex-row items-start justify-between">
                                        <View className="flex-row items-start gap-3 flex-1">
                                            <View
                                                className="w-12 h-12 rounded-full items-center justify-center"
                                                style={{ backgroundColor: `${metric.color}20` }}
                                            >
                                                <Icon size={24} color={metric.color} />
                                            </View>
                                            <View className="flex-1">
                                                <CardTitle>{metric.title}</CardTitle>
                                                <CardDescription>vs. last week</CardDescription>
                                            </View>
                                        </View>
                                        <View className="items-end">
                                            <Text className="text-2xl font-bold text-foreground">
                                                {metric.current}
                                            </Text>
                                            <View className="flex-row items-center gap-1">
                                                <TrendIcon size={16} color={trendColor} />
                                                <Text
                                                    className="text-sm font-medium"
                                                    style={{ color: trendColor }}
                                                >
                                                    {metric.change}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </View>

                {/* Monthly Goals */}
                <View className="gap-4">
                    <Text className="text-xl font-semibold text-foreground">Monthly Goals</Text>
                    {monthlyGoals.map((goal) => {
                        const progress = (goal.current / goal.target) * 100;
                        return (
                            <Card key={goal.id}>
                                <CardHeader>
                                    <View className="gap-3">
                                        <View className="flex-row items-center justify-between">
                                            <CardTitle>{goal.title}</CardTitle>
                                            <Text className="text-sm text-muted-foreground">
                                                {goal.current} / {goal.target} {goal.unit}
                                            </Text>
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            <View className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                                                <View
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                />
                                            </View>
                                            <Text className="text-base font-bold text-foreground w-12 text-right">
                                                {Math.round(progress)}%
                                            </Text>
                                        </View>
                                    </View>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}
