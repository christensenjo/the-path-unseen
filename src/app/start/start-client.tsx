"use client";

import { useRouter } from "next/navigation";
import { useGameStore, useGameActions } from "~/hooks/useGameStore";

interface StartClientProps {
    userName: string;
}

export default function StartClient({ userName }: StartClientProps) {
    const router = useRouter();
    const { isLoading } = useGameStore();
    const { generateAndStoreSetting, generateAndStoreImage } = useGameActions();

    const handleNewExperience = async () => {
        try {
            await generateAndStoreSetting();
            await generateAndStoreImage();
            
            // Navigate to the game board
            router.push('/game-board');
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#040D12] to-[#183D3D] text-white">
            <h1 className="text-4xl font-bold mb-8">Welcome, {userName}!</h1>
            <button
                onClick={handleNewExperience}
                disabled={isLoading}
                className="bg-[#5C8374] hover:bg-gradient-to-b from-[#5C8374] to-[#93B1A6] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
                {isLoading ? 'Loading...' : 'New Experience'}
            </button>
        </div>
    );
}
