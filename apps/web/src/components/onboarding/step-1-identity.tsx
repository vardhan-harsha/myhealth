import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Ruler } from "lucide-react";
import { motion } from "framer-motion";

export function Step1Identity({ onNext, data }: { onNext: (data: any) => void; data: any }) {
    const [name, setName] = useState(data.name || "");
    const [gender, setGender] = useState(data.gender || "");
    const [units, setUnits] = useState(data.units || "metric");

    const handleSubmit = () => {
        if (!name.trim()) return toast.error("Please enter your name");
        if (!gender) return toast.error("Please select a gender identity");

        onNext({ name, gender, units });
    };

    return (
        <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                        Let's get to know you
                    </CardTitle>
                    <CardDescription>
                        We'll customize the experience based on your identity.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md transition-all hover:scale-[1.02]" size="lg" onClick={handleSubmit}>
                        Continue
                    </Button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-4">
                1 of 6 steps
            </p>
        </motion.div>
    );
}
