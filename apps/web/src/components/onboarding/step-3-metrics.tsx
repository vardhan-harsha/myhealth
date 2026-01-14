import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Ruler, Weight, Smartphone, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Step3Metrics({ onNext, onBack, data }: { onNext: (data: any) => void; onBack: () => void; data: any }) {
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSynced, setIsSynced] = useState(false);

    const [age, setAge] = useState(data.metrics?.age || "");
    const [height, setHeight] = useState(data.metrics?.height || "");
    const [weight, setWeight] = useState(data.metrics?.weight || "");
    const [activityLevel, setActivityLevel] = useState(data.metrics?.activityLevel || "");

    const units = data.units || "metric"; // from step 1
    const heightUnit = units === "metric" ? "cm" : "ft"; // Simplified for now
    const weightUnit = units === "metric" ? "kg" : "lbs";

    const handleSync = async () => {
        setIsSyncing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock data
        setAge("28");
        setHeight(units === "metric" ? "178" : "5.10");
        setWeight(units === "metric" ? "75" : "165");
        setActivityLevel("moderate");

        setIsSyncing(false);
        setIsSynced(true);
        toast.success("Health data synced successfully!");
    };

    const handleSubmit = () => {
        if (!age || !height || !weight || !activityLevel) {
            return toast.error("Please fill in all fields");
        }

        onNext({
            metrics: {
                age,
                height,
                weight,
                activityLevel
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
                <h2 className="text-4xl font-bold mb-3 text-foreground">Build your foundation</h2>
                <p className="text-lg text-muted-foreground">We use these metrics to calculate your personalized plan.</p>
            </div>

            <div className="space-y-8 mb-12">
                {/* Smart Sync Section */}
                <div className="space-y-3">
                    <Label>Quick Fill</Label>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full h-16 relative overflow-hidden border-2 transition-all",
                            isSynced
                                ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                                : "border-dashed border-muted-foreground/30 hover:border-orange-400 hover:bg-orange-50/50"
                        )}
                        onClick={handleSync}
                        disabled={isSynced || isSyncing}
                    >
                        {isSyncing ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Syncing with Health App...</span>
                            </div>
                        ) : isSynced ? (
                            <div className="flex items-center gap-2">
                                <Check className="h-5 w-5" />
                                <span>Synced with HealthKit</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Smartphone className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">Sync with Health App</div>
                                    <div className="text-xs text-muted-foreground font-normal">Auto-fill age, height, weight</div>
                                </div>
                            </div>
                        )}
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or add manually</span>
                    </div>
                </div>

                {/* Form Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <div className="relative">
                            <Input
                                id="age"
                                type="number"
                                placeholder="25"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="activity">Activity Level</Label>
                        <Select value={activityLevel} onValueChange={setActivityLevel}>
                            <SelectTrigger id="activity">
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sedentary">Sedentary (Office job)</SelectItem>
                                <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                                <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                                <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                                <SelectItem value="athlete">Athlete (2x per day)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">Height ({heightUnit})</Label>
                        <div className="relative">
                            <Ruler className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="height"
                                type="number"
                                className="pl-9"
                                placeholder="175"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight ({weightUnit})</Label>
                        <div className="relative">
                            <Weight className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="weight"
                                type="number"
                                className="pl-9"
                                placeholder="70"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isSynced && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-green-50 dark:bg-green-950/20 p-3 rounded-md flex items-center gap-2 text-sm text-green-700 dark:text-green-400"
                        >
                            <Check className="h-4 w-4" />
                            Data auto-filled! You can verify and edit if needed.
                        </motion.div>
                    )}
                </AnimatePresence>
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
