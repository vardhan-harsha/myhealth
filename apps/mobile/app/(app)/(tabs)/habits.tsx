import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Apple, Dumbbell, Droplets, Brain, Moon, Pill, Sun, Coffee } from 'lucide-react-native';
import { CheckCircle, Circle } from 'lucide-react-native';
import { useState } from 'react';

// Dummy habits data
const habitsData = [
    {
        id: 1,
        title: 'Healthy Breakfast',
        description: 'Eat a nutritious breakfast',
        icon: Apple,
        color: '#4ac885',
        completed: true,
        time: '8:00 AM',
    },
    {
        id: 2,
        title: 'Morning Exercise',
        description: '30 minutes workout',
        icon: Dumbbell,
        color: '#fd822b',
        completed: true,
        time: '9:00 AM',
    },
    {
        id: 3,
        title: 'Hydration Check',
        description: 'Drink 8 glasses of water',
        icon: Droplets,
        color: '#3276e4',
        completed: false,
        time: 'Throughout day',
    },
    {
        id: 4,
        title: 'Meditation',
        description: '10 minutes mindfulness',
        icon: Brain,
        color: '#7033ff',
        completed: true,
        time: '12:00 PM',
    },
    {
        id: 5,
        title: 'Vitamins',
        description: 'Take daily supplements',
        icon: Pill,
        color: '#fd822b',
        completed: false,
        time: '1:00 PM',
    },
    {
        id: 6,
        title: 'Afternoon Walk',
        description: '15 minutes outdoor walk',
        icon: Sun,
        color: '#4ac885',
        completed: false,
        time: '3:00 PM',
    },
    {
        id: 7,
        title: 'Evening Tea',
        description: 'Herbal tea relaxation',
        icon: Coffee,
        color: '#7033ff',
        completed: false,
        time: '5:00 PM',
    },
    {
        id: 8,
        title: 'Dinner',
        description: 'Balanced evening meal',
        icon: Apple,
        color: '#4ac885',
        completed: false,
        time: '7:00 PM',
    },
    {
        id: 9,
        title: 'Evening Stretching',
        description: '10 minutes flexibility',
        icon: Dumbbell,
        color: '#fd822b',
        completed: false,
        time: '8:00 PM',
    },
    {
        id: 10,
        title: 'Sleep Routine',
        description: '8 hours quality sleep',
        icon: Moon,
        color: '#3276e4',
        completed: false,
        time: '10:00 PM',
    },
];

export default function HabitsScreen() {
    const [habits, setHabits] = useState(habitsData);

    const toggleHabit = (id: number) => {
        setHabits((prevHabits) =>
            prevHabits.map((habit) =>
                habit.id === id ? { ...habit, completed: !habit.completed } : habit
            )
        );
    };

    const completedCount = habits.filter((h) => h.completed).length;
    const totalCount = habits.length;

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
            <View className="gap-6">
                {/* Header */}
                <View className="gap-2">
                    <Text className="text-3xl font-bold text-foreground">Daily Habits</Text>
                    <Text className="text-base text-muted-foreground">
                        Build a healthier lifestyle, one habit at a time
                    </Text>
                </View>

                {/* Progress Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Progress</CardTitle>
                        <CardDescription>
                            {completedCount} of {totalCount} habits completed
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <View className="flex-row items-center gap-2">
                            <View className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-primary rounded-full"
                                    style={{
                                        width: `${(completedCount / totalCount) * 100}%`,
                                    }}
                                />
                            </View>
                            <Text className="text-lg font-bold text-foreground">
                                {Math.round((completedCount / totalCount) * 100)}%
                            </Text>
                        </View>
                    </CardContent>
                </Card>

                {/* Habits List */}
                <View className="gap-4">
                    {habits.map((habit) => {
                        const Icon = habit.icon;
                        const CheckIcon = habit.completed ? CheckCircle : Circle;

                        return (
                            <TouchableOpacity
                                key={habit.id}
                                onPress={() => toggleHabit(habit.id)}
                                activeOpacity={0.7}
                            >
                                <Card>
                                    <CardHeader>
                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center gap-3 flex-1">
                                                <View
                                                    className="w-12 h-12 rounded-full items-center justify-center"
                                                    style={{
                                                        backgroundColor: `${habit.color}20`,
                                                        opacity: habit.completed ? 0.6 : 1,
                                                    }}
                                                >
                                                    <Icon size={24} color={habit.color} />
                                                </View>
                                                <View className="flex-1">
                                                    <CardTitle
                                                        className={habit.completed ? 'line-through opacity-60' : ''}
                                                    >
                                                        {habit.title}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {habit.description} • {habit.time}
                                                    </CardDescription>
                                                </View>
                                            </View>
                                            <CheckIcon
                                                size={28}
                                                color={habit.completed ? '#4ac885' : '#747474'}
                                                strokeWidth={2}
                                            />
                                        </View>
                                    </CardHeader>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}
