"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface DateSelectorProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const date = new Date(selectedDate);
    const today = new Date();

    const goToPreviousDay = () => {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        onDateChange(prev.toISOString().split("T")[0]!);
    };

    const goToToday = () => {
        onDateChange(today.toISOString().split("T")[0]!);
    };

    const isToday = selectedDate === today.toISOString().split("T")[0];

    return (
        <div className="flex items-center justify-between rounded-lg border p-4">
            <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousDay}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {format(date, "EEEE, MMMM d, yyyy")}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                                if (newDate) {
                                    onDateChange(newDate.toISOString().split("T")[0]!);
                                    setIsOpen(false);
                                }
                            }}
                            disabled={(date) => date > today}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {!isToday && (
                    <Button variant="ghost" onClick={goToToday}>
                        Today
                    </Button>
                )}
            </div>

            <Button
                variant="outline"
                size="icon"
                disabled={isToday}
                onClick={() => {
                    const next = new Date(date);
                    next.setDate(next.getDate() + 1);
                    if (next <= today) {
                        onDateChange(next.toISOString().split("T")[0]!);
                    }
                }}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
