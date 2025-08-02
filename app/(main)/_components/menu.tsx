"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmModal from "@/components/modals/confirm-modal";

interface MenuProps {
    documentId: Id<"documents">
}

const Menu = ({
    documentId
}: MenuProps) => {
    const router = useRouter();
    const {user} = useUser();
    const params = useParams();

    const archive = useMutation(api.documents.archive);
    const remove = useMutation(api.documents.remove);

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });
    
    const onArchive = () => {
        const promise = archive({id: documentId})
        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note."
        })

        router.push("/documents");
    }

    const onRemove = () => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        });

        if(params.documentId === documentId){
            router.push("/documents");
        };
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                {!document?.isArchived && (
                    <DropdownMenuItem onClick={onArchive}>
                        <Trash className="h-4 w-4 mr-2"/>
                        Move to trash
                    </DropdownMenuItem>
                )}
                {document?.isArchived && (
                    <DropdownMenuItem>
                        <ConfirmModal onConfirm={()=> onRemove()}>
                            <div role="button" className="flex gap-x-4 items-center">
                                <Trash className="h-4 w-4 text-muted-foreground"/>
                                Delete forever
                            </div>
                        </ConfirmModal>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator/>
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return(
        <Skeleton className="h-10 w-10"/>
    )
}
 
export default Menu;