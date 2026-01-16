"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const carouselSlides = [
    {
        image: "/assets/auth/natural-health.webp",
        title: "Control the Controllables",
        description: "Master your daily inputs: nutrition, training, and sleep for a programmable physique.",
    },
    {
        image: "/assets/auth/active-lifestyle.webp",
        title: "The 90-Year Lifestyle",
        description: "Transform your health journey with AI-powered guidance and sustainable fitness.",
    },
    {
        image: "/assets/auth/progress-tracking.webp",
        title: "Track Your Progress",
        description: "Monitor your vitals and unlock insights that empower better health decisions.",
    },
    {
        image: "/assets/auth/wellness-balance.webp",
        title: "Achieve Balance",
        description: "Build lasting wellness through mindful practices and personalized coaching.",
    },
];

export function AuthCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Background Images */}
            {carouselSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
            ))}

            {/* Content */}
            <div className="absolute inset-0 flex items-end justify-center p-8">
                <div className="max-w-md space-y-4 text-center text-white">
                    {carouselSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-500 ${index === currentSlide
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 absolute"
                                }`}
                        >
                            <h2 className="text-3xl font-bold tracking-tight">
                                {slide.title}
                            </h2>
                            <p className="text-lg text-white/90">
                                {slide.description}
                            </p>
                        </div>
                    ))}

                    {/* Carousel Indicators */}
                    <div className="flex justify-center gap-2 pt-4">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all ${index === currentSlide
                                    ? "w-8 bg-white"
                                    : "w-2 bg-white/50 hover:bg-white/75"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
