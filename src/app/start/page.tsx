import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Start() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#040D12] to-[#183D3D] text-white">
            <h1 className="text-4xl font-bold mb-8">Welcome, {session.user.name}!</h1>
            <Link href="/game-board" className="bg-[#5C8374] hover:bg-gradient-to-b from-[#5C8374] to-[#93B1A6] text-white font-bold py-2 px-4 rounded">
                New Experience
            </Link>
        </div>
    );
}
