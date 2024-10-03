"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StartClientProps {
    userName: string;
}

export default function StartClient({ userName }: StartClientProps) {
const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

const handleNewExperience = async () => {
    setIsLoading(true);
    try {
        // Make API request to OpenAI
        const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ context: "A creepy vampire castle" }),
        });

        if (!response.ok) {
            throw new Error('OpenAI API request failed');
        }

        // const data = {};
        // Process the OpenAI response data as needed

        // Navigate to the game board
        router.push('/game-board');
    } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show error message to user)
    } finally {
        setIsLoading(false);
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
