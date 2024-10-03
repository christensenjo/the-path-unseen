import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default async function GameBoard() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex h-screen flex-row items-center justify-center bg-gradient-to-b from-[#040D12] to-[#183D3D] text-white">
            <div className="w-2/3 h-fit m-6 rounded-xl flex flex-col items-center justify-center overflow-hidden">
                <AspectRatio ratio={16 / 9} className="w-full h-full">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#183D3D] to-[#040D12]">
                        <p className="text-gray-300">Image here</p>
                    </div>
                </AspectRatio>
            </div>
            <div className="w-1/3 bg-[#93B1A6] h-full flex-col p-6">
                <h1 className="text-2xl font-bold text-[#040D12] text-center">Welcome, {session.user.name}</h1>
            </div>
        </div>
    );
}
