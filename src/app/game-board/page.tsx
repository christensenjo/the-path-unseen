import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function GameBoard() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex h-screen flex-row items-center justify-center bg-gradient-to-b from-[#040D12] to-[#183D3D] text-white">
            {/* <h1 className="text-4xl font-bold">Welcome to The Path Unseen</h1>
            <p className="mt-4">Prepare for a new experience, {session.user.name}!</p> */}
            <div className="border-2 border-white w-2/3 h-3/4 m-6 rounded-xl flex flex-col items-center justify-center">
                <p className="text-gray-300">Image here</p>
            </div>
            <div className="w-1/3 bg-[#93B1A6] h-full flex-col p-6">
                <h1 className="text-2xl font-bold text-[#040D12] text-center">Welcome, {session.user.name}</h1>
            </div>
        </div>
    );
}
