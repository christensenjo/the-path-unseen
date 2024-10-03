import { LoginButton } from "~/app/_components/login-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#040D12] to-[#183D3D] text-white">
      <h1 className="text-4xl font-bold">The Path Unseen</h1>

      <div className="mt-4">
        <LoginButton />
      </div>
    </main>
  );
}
