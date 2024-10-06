import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import GameBoardClient from "./game-board-client";

export default async function GameBoard() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex h-screen flex-row items-center justify-center bg-gradient-to-b from-[#040D12] to-[#183D3D] text-white">
            <GameBoardClient userName={session.user.name ?? ""} />
        </div>
    );
}
