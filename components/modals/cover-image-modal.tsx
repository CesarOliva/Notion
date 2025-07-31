"use client";

import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog"
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import React, { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { UploaderProvider, UploadFn } from "../upload/uploader-provider";

export const CoverImageModal = () => {
    const params = useParams();
    const { edgestore }  = useEdgeStore();
    const coverImage = useCoverImage();

    const update = useMutation(api.documents.update);

    const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {
            const res = await edgestore.publicFiles.upload({
                file,
                signal,
                onProgressChange,
            });

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            });
            
            coverImage.onClose();
            return res;
        },
        [edgestore, params.documentId, update, coverImage] // Añade todas las dependencias necesarias
    );

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover image</h2>
                </DialogHeader>
                <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <SingleImageDropzone className="w-full outline-none"/>
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    );
}
 