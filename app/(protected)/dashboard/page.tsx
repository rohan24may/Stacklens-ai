import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-semibold">
        Welcome {user?.email}
      </h1>
    </div>
  );
}