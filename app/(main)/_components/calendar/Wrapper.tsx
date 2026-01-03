'use client';

import React, { useState } from "react";
import { toast } from "sonner";
import { ContinuousCalendar } from "@/app/(main)/_components/calendar/calendar";

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DemoWrapper() {
    //Send to the specified day
    //Needs a path to the day: [year]/[month]/[day]
    //Or it can be [year-month-day] or sum
    //ALSO ADD A TOAST MESSAGE AT EXPORT.TSX  --DONE
    const onClickHandler = (day: number, month: number, year: number) => {
        const Message = `Clicked on ${monthNames[month]} ${day}, ${year}`
        toast.success(Message);
    }

    return (
        <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 px-4 pt-4 items-center justify-center">
            <div className="relative h-full overflow-auto">
                <ContinuousCalendar onClick={onClickHandler} />
            </div>
        </div>
    );
}