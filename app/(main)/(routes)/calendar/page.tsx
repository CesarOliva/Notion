'use client';

import { ContinuousCalendar } from "@/app/(main)/_components/calendar/calendar";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CalendarPage() {
    const router = useRouter();

    const handleGetDate = (day: number, month: number, year: number) => {
        var dayString = day.toString()
        if(dayString.length < 2){
            dayString = `0${dayString}`
        }
        var monthString = (month+1).toString()
        if(monthString.length < 2){
            monthString = `0${monthString}`
        }
        const dateString = `${year}-${monthString}-${dayString}`;

        router.push(`/calendar/${dateString}`);
        toast.success("Redirecting...")
    }

    return (
        <div className="w-full flex h-screen max-h-screen flex-col gap-4 px-4 pt-4 items-center justify-center">
            <div className="w-full max-w-[1200px] h-full overflow-auto">
                <ContinuousCalendar onClick={handleGetDate} />
            </div>
        </div>
    );
}