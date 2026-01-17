import { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
    {
        image: require('../../assets/auth/natural-health.webp'),
        title: 'Control the Controllables',
        description: 'Master your daily inputs: nutrition, training, and sleep for a programmable physique.',
    },
    {
        image: require('../../assets/auth/active-lifestyle.webp'),
        title: 'The 90-Year Lifestyle',
        description: 'Transform your health journey with AI-powered guidance and sustainable fitness.',
    },
    {
        image: require('../../assets/auth/progress-tracking.webp'),
        title: 'Track Your Progress',
        description: 'Monitor your vitals and unlock insights that empower better health decisions.',
    },
    {
        image: require('../../assets/auth/wellness-balance.webp'),
        title: 'Achieve Balance',
        description: 'Build lasting wellness through mindful practices and personalized coaching.',
    },
];

export function AuthCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="relative h-96 w-full overflow-hidden rounded-b-3xl">
            {slides.map((slide, index) => (
                <Animated.View
                    key={index}
                    entering={index === currentSlide ? FadeIn.duration(1000) : undefined}
                    exiting={FadeOut.duration(500)}
                    className={`absolute inset-0 ${index === currentSlide ? 'z-10' : 'z-0 opacity-0'}`}
                >
                    <Image
                        source={slide.image}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    {/* Gradient overlay */}
                    <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Content */}
                    <View className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                        <Animated.View
                            entering={SlideInRight.delay(200).springify()}
                            exiting={SlideOutLeft.springify()}
                        >
                            <Text className="text-white text-3xl font-bold tracking-tight mb-2">
                                {slide.title}
                            </Text>
                            <Text className="text-white/90 text-lg">
                                {slide.description}
                            </Text>
                        </Animated.View>

                        {/* Indicators */}
                        <View className="flex-row justify-center gap-2 mt-6">
                            {slides.map((_, idx) => (
                                <Pressable
                                    key={idx}
                                    onPress={() => setCurrentSlide(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === currentSlide
                                        ? 'w-8 bg-white'
                                        : 'w-2 bg-white/50'
                                        }`}
                                />
                            ))}
                        </View>
                    </View>
                </Animated.View>
            ))}
        </View>
    );
}
