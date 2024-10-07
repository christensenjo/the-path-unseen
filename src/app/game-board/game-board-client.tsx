"use client";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import { useGameStore } from "~/hooks/useGameStore";
import Image from "next/image";

interface GameBoardClientProps {
    userName: string;
}

export default function GameBoardClient({ userName }: GameBoardClientProps) {
    const { imageUrl, setting, isLoading } = useGameStore();

    return (
        <>
            <div className="w-2/3 h-fit m-6 rounded-xl flex flex-col items-center justify-center overflow-hidden">
                <AspectRatio ratio={16 / 9} className="w-full h-full">
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#183D3D] to-[#040D12]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
                        </div>
                    ) : imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="Generated fantasy landscape"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#183D3D] to-[#040D12]">
                            <p className="text-gray-300">No image generated yet</p>
                        </div>
                    )}
                </AspectRatio>
            </div>
            <div className="w-1/3 bg-[#93B1A6] h-full flex-col p-6">
                <h1 className="text-2xl font-bold text-[#040D12] text-center mb-4">Welcome, {userName}</h1>
                <p className="text-[#040D12] text-lg mb-4">
                    Setting: {setting ?? 'None'}
                </p>
            </div>
        </>
    );
}
