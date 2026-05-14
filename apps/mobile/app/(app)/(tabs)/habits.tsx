import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Apple, Dumbbell, Droplets, Brain, Moon, Pill, Sun, Coffee } from 'lucide-react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

// Dummy habits data
const habitsData = [
    { id: 1, title: 'Healthy Breakfast', description: 'Oatmeal & fruits', icon: Apple, color: '#FF6B6B', bg: '#FF6B6B15', completed: true, time: '8:00 AM' },
    { id: 2, title: 'Morning Exercise', description: '30 mins workout', icon: Dumbbell, color: '#845EF7', bg: '#845EF715', completed: true, time: '9:00 AM' },
    { id: 3, title: 'Hydration', description: '8 glasses of water', icon: Droplets, color: '#4A90E2', bg: '#D4EBF8', completed: false, time: 'All day' },
    { id: 4, title: 'Meditation', description: '10 mins mindfulness', icon: Brain, color: '#20C997', bg: '#20C99715', completed: false, time: '12:00 PM' },
    { id: 5, title: 'Vitamins', description: 'Daily supplements', icon: Pill, color: '#F5A623', bg: '#FEF3D5', completed: false, time: '1:00 PM' },
    { id: 6, title: 'Afternoon Walk', description: '15 mins outdoor', icon: Sun, color: '#FF922B', bg: '#FF922B15', completed: false, time: '3:00 PM' },
    { id: 7, title: 'Sleep Routine', description: '8 hrs quality sleep', icon: Moon, color: '#5C33CF', bg: '#5C33CF15', completed: false, time: '10:00 PM' },
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
    const progressPerc = Math.round((completedCount / totalCount) * 100);

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={['top']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-[34px] leading-10 font-bold text-gray-900 mb-2">Habits</Text>
                    <Text className="text-[17px] font-medium text-gray-500">Build a healthier lifestyle</Text>
                </View>

                {/* Progress Summary Card */}
                <View className="bg-[#E7F5E8] rounded-[32px] p-6 mb-8 shadow-sm border border-[#D5EAD6]">
                    <View className="flex-row justify-between items-end mb-4">
                        <View>
                            <Text className="text-gray-900 font-bold text-[19px] mb-1">Today's Progress</Text>
                            <Text className="text-gray-600 text-[14px] font-medium">{completedCount} of {totalCount} habits done</Text>
                        </View>
                        <Text className="text-[28px] font-black text-gray-900">{progressPerc}%</Text>
                    </View>
                    
                    <View className="h-3 bg-white/60 rounded-full overflow-hidden w-full">
                        <View 
                            className="h-full rounded-full bg-[#4CAF50]" 
                            style={{ width: `${progressPerc}%` }} 
                        />
                    </View>
                </View>

                {/* Habits List */}
                <Text className="text-xl font-bold text-gray-900 mb-4">Today's Checklist</Text>
                
                <View className="gap-3">
                    {habits.map((habit) => {
                        const Icon = habit.icon;
                        const isCompleted = habit.completed;

                        return (
                            <TouchableOpacity
                                key={habit.id}
                                onPress={() => toggleHabit(habit.id)}
                                activeOpacity={0.7}
                                className={`bg-white rounded-[24px] p-4 flex-row items-center justify-between shadow-sm border ${
                                    isCompleted ? 'border-[#4CAF50] bg-[#FAFFFA]' : 'border-gray-100'
                                }`}
                            >
                                <View className="flex-row items-center flex-1 pr-4">
                                    <View
                                        className="w-[48px] h-[48px] rounded-[16px] items-center justify-center mr-4"
                                        style={{ backgroundColor: habit.bg, opacity: isCompleted ? 0.5 : 1 }}
                                    >
                                        <Icon size={24} color={habit.color} />
                                    </View>
                                    <View className="flex-1">
                                        <Text 
                                            className={`text-[17px] font-bold mb-0.5 ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}
                                        >
                                            {habit.title}
                                        </Text>
                                        <Text className={`text-[13px] font-medium ${isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {habit.description} • {habit.time}
                                        </Text>
                                    </View>
                                </View>
                                <View className="ml-2">
                                    {isCompleted ? (
                                        <CheckCircle2 size={28} color="#4CAF50" fill="#4CAF50" stroke="#fff" />
                                    ) : (
                                        <Circle size={28} color="#D4D4D8" strokeWidth={2.5} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
