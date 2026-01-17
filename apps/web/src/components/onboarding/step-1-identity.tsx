import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Ruler } from "lucide-react";
import { motion } from "framer-motion";

interface OnboardingData {
    name?: string;
    gender?: string;
    units?: string;
}

export function Step1Identity({ onNext, data }: { onNext: (data: Partial<OnboardingData>) => void; data: Partial<OnboardingData> }) {
    const [name, setName] = useState(data.name ?? "");
    const [gender, setGender] = useState(data.gender ?? "");
    const [units, setUnits] = useState(data.units ?? "metric");

    const handleSubmit = () => {
        if (!name.trim()) return toast.error("Please enter your name");
        if (!gender) return toast.error("Please select a gender identity");

        onNext({ name, gender, units });
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
                <h2 className="text-4xl font-bold mb-3 text-foreground">Let&apos;s get to know you</h2>
                <p className="text-lg text-muted-foreground">We&apos;ll customize the experience based on your identity.</p>
            </div>

            <div className="space-y-6 mb-12">
                <div className="space-y-2">
                    <Label htmlFor="name">What should we call you?</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="name"
                            placeholder="Your First Name"
                            className="pl-9"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gender">Gender Identity</Label>
                    <Select onValueChange={setGender} defaultValue={gender}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Required for accurate calorie calculations.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Unit Preference</Label>
                    <RadioGroup defaultValue={units} onValueChange={setUnits} className="grid grid-cols-2 gap-4">
                        <div>
                            <RadioGroupItem value="metric" id="metric" className="peer sr-only" />
                            <Label
                                htmlFor="metric"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Ruler className="mb-3 h-6 w-6" />
                                Metric (kg/cm)
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="imperial" id="imperial" className="peer sr-only" />
                            <Label
                                htmlFor="imperial"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Ruler className="mb-3 h-6 w-6" />
                                Imperial (lbs/ft)
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
                <Button
                    className="h-12 px-8 rounded-full shadow-lg shadow-primary/20 text-base font-bold"
                    onClick={handleSubmit}
                    size="lg"
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    );
}
