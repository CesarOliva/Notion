"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create)

    const onCreate = () =>{
        const promise = create({title: "Untitled"});
        
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        })
    }

    return (
        <div className="flex flex-col justify-center items-center h-full space-y-4">
            <Image
                src="/docs.avif"
                height="300"
                width="300"
                alt="Docs"
                className="dark:hidden"
            />
            <Image
                src="/dark-docs.avif"
                height="300"
                width="300"
                alt="Docs"
                className="hidden dark:block"
            />

            <h2 className="text-lg font-medium text-center">Welcome to {user?.firstName}&apos;s Notion</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                    Create a note
            </Button>
        </div>
    );
}
 
export default DocumentsPage;