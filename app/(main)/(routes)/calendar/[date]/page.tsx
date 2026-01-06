'use client';

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import IconPicker from '@/components/icon-picker';
import { ChevronRight, Search, Smile, X } from 'lucide-react';
import { useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SpotifySearch from "@/app/(main)/_components/calendar/spotify";

const DatePage = ({
    params,
}:{
    params: { date:string }
}) => {
    let [year, month, day] = params.date.split('-')

    const Editor = useMemo(()=>dynamic(()=>import("@/components/editor"), {ssr: false}), [])

    const router = useRouter();
    const get = useMutation(api.calendar.getOrCreate);
    const removeMood = useMutation(api.calendar.removeMood);
    const update = useMutation(api.calendar.update);
    
    useEffect(()=>{
        get({
            date: params.date 
        })
    })

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = monthNames[parseInt(month)-1];

    const dateData = useQuery(api.calendar.getByDate, {
        date: params.date
    })

    const handlePrevDay = () => {
        const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
        date.setDate(date.getDate() - 1)

        const prevYear = date.getFullYear();
        const prevMonth = String(date.getMonth() + 1).padStart(2, "0");
        const prevDay = String(date.getDate()).padStart(2, "0");
        router.push(`${prevYear}-${prevMonth}-${prevDay}`)
    }

    const handleNextDay = () => {
        const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
        date.setDate(date.getDate() +1)

        const prevYear = date.getFullYear();
        const prevMonth = String(date.getMonth() + 1).padStart(2, "0");
        const prevDay = String(date.getDate()).padStart(2, "0");
        router.push(`${prevYear}-${prevMonth}-${prevDay}`)
    }

    const onMoodSelect = (mood: string) => {
        update({
            date: params.date,
            mood: mood,
        });
    }

    const onRemoveMood = ()=>{
        removeMood({
            date: params.date
        });
    }

    const onChange = (content: string) => {
        update({
            date: params.date,
            content
        });
    }

    if(dateData === undefined){
        return(
            <div>
                <div className="md:max-w-3xl lg:max-w-4xl mt-10 mx-auto">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-4 w-[80%]"/>
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-4 w-[40%]"/>
                        <Skeleton className="h-4 w-[60%]"/>
                    </div>
                </div>
            </div>
        )
    }

    if(dateData === null){
        return null;
    }

    return (
        <section className="w-full flex h-screen max-h-screen flex-col gap-4 px-4 pt-6 items-center justify-center">
            <div className="w-full max-w-[1200px] h-full overflow-auto px-4">
                <div className="w-full border-b border-slate-200 py-2 flex justify-between items-center">
                    <div className="flex justify-center items-center gap-x-2">
                        <button onClick={handlePrevDay} className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 dark:hover:bg-neutral-700 sm:p-2">
                            <svg className="size-4 text-slate-800 dark:text-slate-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
                            </svg>    
                        </button>
                        <h2 className="text-lg font-semibold sm:text-xl">{monthString} {day}, {year}</h2>
                        <button onClick={handleNextDay} className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 dark:hover:bg-neutral-700 sm:p-2" >
                            <svg className="size-4 text-slate-800 dark:text-slate-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                    {!dateData.mood ? (
                        <IconPicker onChange={onMoodSelect} asChild>                        
                            <Button className="rounded-full text-xs" size="sm">
                                <Smile className="h-4 w-4"/>
                            </Button>
                        </IconPicker>
                    ): (
                       <div className="flex items-center gap-x-1 group/icon">
                            <Button variant="outline" size="icon" onClick={onRemoveMood} className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs">
                                <X className="h-4 w-4"/>
                            </Button>
                            <IconPicker onChange={onMoodSelect} asChild>
                                <p className="text-4xl hover:opacity-75 transition">{dateData.mood}</p>
                            </IconPicker>
                        </div>
                    )}
                </div>
                <div className="flex w-full mt-4">
                    <div className="w-[70%]">
                        <Editor onChange={onChange} initialContent={dateData.content}/>
                    </div>

                    <div className="w-[30%] p-2 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg flex flex-col h-fit">
                        <SpotifySearch/>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default DatePage;