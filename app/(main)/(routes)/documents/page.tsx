"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DocumentsPage = () => {
    const { user } = useUser();

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

            <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Notion</h2>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2"/>
                    Create a note
            </Button>
        </div>
    );
}
 
export default DocumentsPage;