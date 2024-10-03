import { getServerAuthSession } from "~/server/auth";
import StartClient from "./start-client";

export default async function Start() {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        // Handle the case when there's no session or user
        return <div>Please log in to access this page.</div>;
    }

    return <StartClient userName={session.user.name ?? "User"} />;
}
