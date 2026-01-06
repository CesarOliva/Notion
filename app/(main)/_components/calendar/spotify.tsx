'use client';

import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SpotifySearch = () => {
    const [cancion, setCancion] = useState('')
    const [canciones, setCanciones] = useState<any[]>([])

    function handleSearch(e: any){
        e.preventDefault();

        if(cancion.trim() === '') return;

        setCancion('')
        getSong(cancion)
    }

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ee7f029faemsh6826b0bcbf41470p1615d1jsn91d20ad48c9f',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    async function getSong(cancion: string){
        try{
            const url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=tracks&offset=0&limit=5&numberOfTopResults=5`;
            const data = await fetch(url, options)
            const res = await data.json()
            console.log(res.tracks.items)
            setCanciones(res.tracks.items)
        } catch(error){
            toast.error('An error has occured.')
        }
    }

    const formatDuration = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    
    return (
        //add isSearching, setIsSearching to change the submit button.
        //add sotd and maybe delete.
        //show form only when no song is selected
        <>
            <form onSubmit={handleSearch}>
                <div className="w-full rounded-md py-1 px-2 flex bg-neutral-100 dark:bg-neutral-700">
                    <input className="w-full bg-transparent border-none focus:outline-none" 
                        type="text"
                        value={cancion}
                        onChange={e => setCancion(e.target.value)}
                        placeholder="Select daily song"
                    />
                    <button type="submit"><Search className="h-4 w-4 mr-1 text-black dark:text-white"/></button>
                </div>
            </form>

            {canciones.map((cancion, index)=>(
                <div key={index} className="cursor-pointer flex mt-2 justify-between items-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md p-1">
                    <div className="flex justify-center items-center">
                        <img className="w-12 h-12 rounded-md border-neutral-700 border" src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt={cancion.data.name}/>
                        <div className="flex flex-col justify-center text-sm ml-2">
                            <h3 className="font-semibold">{cancion.data.name}</h3>
                            <h3 className="text-xs text-neutral-500">{cancion.data.artists.items[0].profile.name} <span>• {formatDuration(cancion.data.duration.totalMilliseconds)}</span></h3>
                        </div>
                    </div>
                    <ChevronRight className="w-6 h-6"/>
                </div>
            ))}
        </>
    );
}
 
export default SpotifySearch;