import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import UsersTable from "./users-table";

export const instant = false;

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("devpanel_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await verifyToken(token);
  } catch {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-3xl font-semibold">
          Dashboard
        </h1>

        <p className="mb-8 text-slate-500">
          User management overview
        </p>

        <UsersTable />
      </div>
    </main>
  );
}