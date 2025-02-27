"use client"

import { Camera, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

function SortableImage({
    url,
    onDelete,
    onUpload
}: {
    url: string | null,
    onDelete: () => void,
    onUpload: () => void
}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const img = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (img.current?.complete) {
            setImageLoaded(true);
        }
    }, [img.current]);

    return (
        <div className="relative aspect-square bg-white shadow-md rounded-lg overflow-hidden group">
            {url ? (
                <>
                    <img
                        src={url}
                        className="w-full h-full object-cover"
                        style={{ display: imageLoaded ? "block" : "none" }}
                        onLoad={() => setImageLoaded(true)}
                        alt=""
                        ref={img}
                    />
                    {!imageLoaded && (
                        <div role="status" className="w-full h-full object-cover space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200" />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={onDelete}
                            className="p-1.5 bg-white rounded-full text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </>
            ) : (
                <button
                    onClick={onUpload}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    type="button"
                >
                    <Camera className="w-8 h-8" />
                    <span className="text-sm">Adaugă Imagine</span>
                </button>
            )}
        </div>
    );
}

export function ImageUpload({
    id,
    imagesLength = 0,
    onChange,
    maxImages = 8
}: {
    id: string,
    imagesLength?: number
    onChange?: (images: string[]) => void
    maxImages?: number
}) {
    const [imgState, setImgState] = useState<string[]>([]);
    useEffect(() => {
        onChange?.(imgState);
    }, [imgState, onChange])

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadIndex, setUploadIndex] = useState<number | null>(null)

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (!reader.result) return;
                if (uploadIndex !== null) {
                    imgState[uploadIndex] = reader.result.toString();
                    setImgState(imgState.toSorted((a, b) => {
                        if (!b) return 1;
                        if (!a) return -1;

                        return -1;
                    }));
                    setUploadIndex(null);
                } else {
                    setImgState([...imgState, reader.result.toString()].slice(0, maxImages));
                }

                // Reset the input
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }

        }
    }, [imgState, maxImages, uploadIndex])

    const handleDelete = useCallback(
        (index: number) => {
            setImgState(imgState.filter((_, i) => i !== index))
        },
        [imgState],
    )

    const triggerFileInput = useCallback((index: number) => {
        setUploadIndex(index)
        fileInputRef.current?.click()
    }, [])

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: maxImages }).map((_, index) => (
                    <SortableImage
                        // key={imgState[index] || `empty-${index}`}
                        url={(index < imagesLength) ? `/api/image/${id}/${index}` : null}
                        onDelete={() => handleDelete(index)}
                        onUpload={() => triggerFileInput(index)}
                    />
                ))}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <input type="hidden" name="images" value={JSON.stringify(imgState)} />
        </div>
    )
}