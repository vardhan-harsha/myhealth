import { View, Text, ScrollView } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Heart, Activity, Footprints, Moon, Droplets, TrendingUp } from 'lucide-react-native';

// Dummy recent activity data
const recentActivities = [
    { id: 1, title: 'Morning Walk', value: '5,234 steps', icon: Footprints, color: '#4ac885', time: '8:30 AM' },
    { id: 2, title: 'Heart Rate', value: '72 bpm', icon: Heart, color: '#fd822b', time: '8:45 AM' },
    { id: 3, title: 'Water Intake', value: '500 ml', icon: Droplets, color: '#3276e4', time: '9:00 AM' },
    { id: 4, title: 'Sleep Quality', value: '7.5 hours', icon: Moon, color: '#7033ff', time: 'Last night' },
    { id: 5, title: 'Workout', value: '30 min cardio', icon: Activity, color: '#fd822b', time: '10:00 AM' },
    { id: 6, title: 'Steps Goal', value: '8,500 steps', icon: TrendingUp, color: '#4ac885', time: '12:00 PM' },
    { id: 7, title: 'Hydration', value: '1.2 L', icon: Droplets, color: '#3276e4', time: '1:00 PM' },
    { id: 8, title: 'Active Minutes', value: '45 minutes', icon: Activity, color: '#fd822b', time: '2:30 PM' },
    { id: 9, title: 'Heart Rate Check', value: '68 bpm', icon: Heart, color: '#fd822b', time: '3:00 PM' },
    { id: 10, title: 'Evening Walk', value: '3,421 steps', icon: Footprints, color: '#4ac885', time: '6:00 PM' },
];

// Quick stats data
const quickStats = [
    { id: 1, label: 'Steps Today', value: '8,655', icon: Footprints, color: '#4ac885' },
    { id: 2, label: 'Active Minutes', value: '45', icon: Activity, color: '#fd822b' },
    { id: 3, label: 'Heart Rate', value: '72 bpm', icon: Heart, color: '#7033ff' },
    { id: 4, label: 'Sleep', value: '7.5h', icon: Moon, color: '#3276e4' },
];

export default function HomeScreen() {
    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
            <View className="gap-6">
                {/* Header */}
                <View className="gap-2">
                    <Text className="text-3xl font-bold text-foreground">Dashboard</Text>
                    <Text className="text-base text-muted-foreground">
                        Track your health journey
                    </Text>
                </View>

                {/* Quick Stats Grid */}
                <View className="flex-row flex-wrap gap-3">
                    {quickStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.id} className="flex-1 min-w-[160px]">
                                <CardHeader>
                                    <View className="flex-row items-center gap-2">
                                        <Icon size={20} color={stat.color} />
                                        <CardDescription>{stat.label}</CardDescription>
                                    </View>
                                </CardHeader>
                                <CardContent>
                                    <Text className="text-2xl font-bold text-foreground">
                                        {stat.value}
                                    </Text>
                                </CardContent>
                            </Card>
                        );
                    })}
                </View>

                {/* Recent Activity Section */}
                <View className="gap-4">
                    <Text className="text-xl font-semibold text-foreground">
                        Recent Activity
                    </Text>

                    {recentActivities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <Card key={activity.id}>
                                <CardHeader>
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-3">
                                            <View
                                                className="w-10 h-10 rounded-full items-center justify-center"
                                                style={{ backgroundColor: `${activity.color}20` }}
                                            >
                                                <Icon size={20} color={activity.color} />
                                            </View>
                                            <View>
                                                <CardTitle>{activity.title}</CardTitle>
                                                <CardDescription>{activity.time}</CardDescription>
                                            </View>
                                        </View>
                                        <Text className="text-lg font-semibold text-foreground">
                                            {activity.value}
                                        </Text>
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
