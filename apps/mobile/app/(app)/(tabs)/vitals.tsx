import { View, Text, ScrollView } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Heart, Activity, Weight, Moon, Footprints, Droplets, Thermometer, Wind } from 'lucide-react-native';

// Dummy vitals data
const vitalsData = [
    {
        id: 1,
        title: 'Heart Rate',
        value: '72 bpm',
        status: 'Normal',
        icon: Heart,
        color: '#fd822b',
        range: '60-100 bpm',
    },
    {
        id: 2,
        title: 'Blood Pressure',
        value: '120/80',
        status: 'Optimal',
        icon: Activity,
        color: '#4ac885',
        range: '90/60 - 120/80',
    },
    {
        id: 3,
        title: 'Weight',
        value: '75.5 kg',
        status: 'On Track',
        icon: Weight,
        color: '#7033ff',
        range: 'Target: 75 kg',
    },
    {
        id: 4,
        title: 'Sleep Duration',
        value: '7.5 hours',
        status: 'Good',
        icon: Moon,
        color: '#3276e4',
        range: '7-9 hours',
    },
    {
        id: 5,
        title: 'Daily Steps',
        value: '8,655',
        status: 'Above Goal',
        icon: Footprints,
        color: '#4ac885',
        range: 'Goal: 8,000',
    },
    {
        id: 6,
        title: 'Hydration',
        value: '2.1 L',
        status: 'Good',
        icon: Droplets,
        color: '#3276e4',
        range: 'Goal: 2.5 L',
    },
    {
        id: 7,
        title: 'Body Temperature',
        value: '36.8°C',
        status: 'Normal',
        icon: Thermometer,
        color: '#fd822b',
        range: '36.1-37.2°C',
    },
    {
        id: 8,
        title: 'Oxygen Level',
        value: '98%',
        status: 'Excellent',
        icon: Wind,
        color: '#4ac885',
        range: '95-100%',
    },
    {
        id: 9,
        title: 'Resting Heart Rate',
        value: '65 bpm',
        status: 'Excellent',
        icon: Heart,
        color: '#4ac885',
        range: '60-100 bpm',
    },
    {
        id: 10,
        title: 'Active Minutes',
        value: '45 min',
        status: 'Good',
        icon: Activity,
        color: '#7033ff',
        range: 'Goal: 60 min',
    },
];

export default function VitalsScreen() {
    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
            <View className="gap-6">
                {/* Header */}
                <View className="gap-2">
                    <Text className="text-3xl font-bold text-foreground">Health Vitals</Text>
                    <Text className="text-base text-muted-foreground">
                        Monitor your key health metrics
                    </Text>
                </View>

                {/* Vitals List */}
                <View className="gap-4">
                    {vitalsData.map((vital) => {
                        const Icon = vital.icon;
                        return (
                            <Card key={vital.id}>
                                <CardHeader>
                                    <View className="flex-row items-start justify-between">
                                        <View className="flex-row items-start gap-3 flex-1">
                                            <View
                                                className="w-12 h-12 rounded-full items-center justify-center"
                                                style={{ backgroundColor: `${vital.color}20` }}
                                            >
                                                <Icon size={24} color={vital.color} />
                                            </View>
                                            <View className="flex-1">
                                                <CardTitle>{vital.title}</CardTitle>
                                                <CardDescription>{vital.range}</CardDescription>
                                            </View>
                                        </View>
                                        <View className="items-end">
                                            <Text className="text-2xl font-bold text-foreground">
                                                {vital.value}
                                            </Text>
                                            <Text
                                                className="text-sm font-medium"
                                                style={{ color: vital.color }}
                                            >
                                                {vital.status}
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
