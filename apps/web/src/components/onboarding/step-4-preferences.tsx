import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Utensils, Dumbbell, Clock, Flame } from "lucide-react";

export function Step4Preferences({ onNext, onBack, data }: { onNext: (data: any) => void; onBack: () => void; data: any }) {
    const [activeTab, setActiveTab] = useState("training");

    // Training
    const [trainingDays, setTrainingDays] = useState(data.trainingPreferences?.days || 3);
    const [sessionDuration, setSessionDuration] = useState(data.trainingPreferences?.duration || "45");

    // Nutrition
    const [dietType, setDietType] = useState(data.nutritionPreferences?.dietType || "omnivore");
    const [allergies, setAllergies] = useState<string[]>(data.nutritionPreferences?.allergies || []);

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
            className="w-full max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                        Customize your routine
                    </CardTitle>
                    <CardDescription>
                        Tailor the program to your lifestyle and tastes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                                    onValueChange={(vals) => setTrainingDays(vals[0])}
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
                                                    ? "border-pink-500 bg-pink-50 dark:bg-pink-950/20 text-pink-700 dark:text-pink-300"
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
                                                        ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 hover:bg-rose-100"
                                                        : "hover:border-rose-200"
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
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" onClick={onBack}>
                        ← Back
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md transition-all hover:scale-[1.02]"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        Next Step →
                    </Button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-4">
                4 of 6 steps
            </p>
        </motion.div>
    );
}
