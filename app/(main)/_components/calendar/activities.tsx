import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const Activities = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [activity, setActivity] = useState('')
    const [color, setColor] = useState('#a7a9de')
    const params = useParams()
    
    const get = useMutation(api.calendar.getOrCreateActivity)

    const handleCreate = (e: any)=>{
        e.preventDefault();

        if(activity.trim() === ''){
            setIsAdding(true);
            return;
        }

        get({
            date: params.date as string,
            name: activity,
            color: color
        })

        setActivity('')
        setColor('#a7a9de')
        setIsAdding(false)
    }

    return (
        <div className="py-2">
            <div className="flex w-full mb-1">
                {!isAdding ? (
                    <span 
                        onClick={()=>{setIsAdding(true)}}
                        className="m-1 flex text-sm items-center cursor-pointer">
                        Add Activities <Plus className="w-5 h-5"/>
                    </span>
                ):(
                    <form onSubmit={handleCreate} className="flex items-center gap-x-1">
                        <input
                            type="text" 
                            placeholder="Activities"
                            className="bg-neutral-100 dark:bg-neutral-700 py-1 px-2 rounded-md focus:outline-none w-full"
                            value={activity}
                            onChange={e => setActivity(e.target.value)}
                        />
                        <input
                            type="color"
                            className="w-12 h-8"
                            value={color}
                            onChange={e => setColor(e.target.value)}                            
                        />

                        {!isAdding ? 
                            <button
                                type="submit" 
                                className="m-1 flex text-sm items-center cursor-pointer">
                                Add <Plus className="w-5 h-5"/>
                            </button>
                        :
                            <X onClick={()=>{setIsAdding(false)}} className="w-5 h-5 text-black dark:text-white cursor-pointer"/>
                        } 
                    </form>
                )}
        
            </div>
            
            {/* <div className="m-1 inline-block rounded-md py-1 px-2 bg-blue-300/70 text-sm">
                💻 Programming
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-purple-300/70 text-sm">
                📔 Reading
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-neutral-300/70 text-sm">
                🎮 Playing
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-green-300/70 text-sm">
                🚶 Walking
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-yellow-300/70 text-sm">
                🍺 Drinking
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-red-300/70 text-sm">
                🍿 Movies
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-pink-300/70 text-sm">
                🩷 Sex
            </div>
            <div className="m-1 inline-block rounded-md py-1 px-2 bg-neutral-700/70 text-sm">
                🎧 Music
            </div>  */}
        </div>
    );
}
 
export default Activities;