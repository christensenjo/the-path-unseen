"use client";

import { signIn } from "next-auth/react";

export function LoginButton() {
    const handleLogin = async () => {
        await signIn("discord", { callbackUrl: "/start" });
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-[#5C8374] hover:bg-gradient-to-b from-[#5C8374] to-[#93B1A6] text-white font-bold py-2 px-4 rounded"
        >
            Login with Discord
        </button>
    );
}
