import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Utensils, Dumbbell } from "lucide-react";

interface OnboardingData {
    trainingPreferences?: {
        days?: number;
        duration?: string;
    };
    nutritionPreferences?: {
        dietType?: string;
        allergies?: string[];
    };
}

export function Step4Preferences({ onNext, onBack, data }: { onNext: (data: Partial<OnboardingData>) => void; onBack: () => void; data: Partial<OnboardingData> }) {
    const [activeTab, setActiveTab] = useState("training");

    // Training
    const [trainingDays, setTrainingDays] = useState(data.trainingPreferences?.days ?? 3);
    const [sessionDuration, setSessionDuration] = useState(data.trainingPreferences?.duration ?? "45");

    // Nutrition
    const [dietType, setDietType] = useState(data.nutritionPreferences?.dietType ?? "omnivore");
    const [allergies, setAllergies] = useState<string[]>(data.nutritionPreferences?.allergies ?? []);

    const toggleAllergy = (allergy: string) => {
        if (allergies.includes(allergy)) {
            setAllergies(allergies.filter(a => a !== allergy));
        } else {
            setAllergies([...allergies, allergy]);
        }
    };

    const handleSubmit = () => {
        // Basic validation
        onNext({
            trainingPreferences: {
                days: trainingDays,
                duration: sessionDuration
            },
            nutritionPreferences: {
                dietType,
                allergies
            }
        });
    };

    return (
        <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="text-left mb-8">
                <h2 className="text-4xl font-bold mb-3 text-foreground">Customize your routine</h2>
                <p className="text-lg text-muted-foreground">Tailor the program to your lifestyle and tastes.</p>
            </div>

            <div className="mb-12">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="training" className="gap-2">
                            <Dumbbell className="h-4 w-4" /> Training
                        </TabsTrigger>
                        <TabsTrigger value="nutrition" className="gap-2">
                            <Utensils className="h-4 w-4" /> Nutrition
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="training" className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-base">Days per week</Label>
                                <span className="text-2xl font-bold text-primary">{trainingDays}</span>
                            </div>
                            <Slider
                                value={[trainingDays]}
                                min={1}
                                max={7}
                                step={1}
                                onValueChange={(vals) => setTrainingDays(vals[0] ?? 3)}
                                className="py-4"
                            />
                            <p className="text-xs text-muted-foreground">
                                How many days can you realistically commit to training?
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-base">Session Duration</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {["30", "45", "60", "90"].map((mins) => (
                                    <div
                                        key={mins}
                                        onClick={() => setSessionDuration(mins)}
                                        className={cn(
                                            "cursor-pointer rounded-lg border-2 p-3 text-center transition-all hover:bg-accent/50",
                                            sessionDuration === mins
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-muted"
                                        )}
                                    >
                                        <div className="font-bold">{mins}</div>
                                        <div className="text-[10px] text-muted-foreground">min</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="nutrition" className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                        <div className="space-y-3">
                            <Label className="text-base">Diet Type</Label>
                            <Select value={dietType} onValueChange={setDietType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select diet" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="omnivore">Omnivore (Everything)</SelectItem>
                                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                    <SelectItem value="vegan">Vegan</SelectItem>
                                    <SelectItem value="paleo">Paleo</SelectItem>
                                    <SelectItem value="keto">Keto</SelectItem>
                                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-base">Allergies / Restrictions</Label>
                            <div className="flex flex-wrap gap-2">
                                {["Gluten", "Dairy", "Peanuts", "Tree Nuts", "Shellfish", "Soy", "Eggs"].map((allergen) => {
                                    const isSelected = allergies.includes(allergen);
                                    return (
                                        <Button
                                            key={allergen}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleAllergy(allergen)}
                                            className={cn(
                                                "rounded-full transition-all",
                                                isSelected
                                                    ? "border-primary bg-primary/10 text-primary"
                                                    : "hover:border-primary/20"
                                            )}
                                        >
                                            {allergen}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="flex items-center gap-4 mt-8">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-12 px-6 rounded-full text-base"
                >
                    Back
                </Button>
                <Button
                    className="h-12 px-8 rounded-full shadow-lg shadow-primary/20 text-base font-bold"
                    size="lg"
                    onClick={handleSubmit}
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    );
}
