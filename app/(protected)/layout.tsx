import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
}