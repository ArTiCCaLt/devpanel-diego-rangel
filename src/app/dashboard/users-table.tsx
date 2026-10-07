"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";

interface UsersResponse {
  users: User[];
  metrics: {
    total: number;
    active: number;
  };
}

export default function UsersTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/users?search=${encodeURIComponent(search)}`,
          {
            signal: controller.signal,
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("devpanel_token");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: UsersResponse = await response.json();

        setUsers(data.users);
        setTotalUsers(data.metrics.total);
        setActiveUsers(data.metrics.active);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, router]);

  return (
    <>
      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Total users
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {totalUsers}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Active users
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {activeUsers}
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border bg-white">
        <div className="border-b p-5">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="w-full max-w-sm rounded-md border px-3 py-2"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-slate-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t"
                  >
                    <td className="px-5 py-4 font-medium">
                      {user.name}
                    </td>

                    <td className="px-5 py-4">
                      {user.email}
                    </td>

                    <td className="px-5 py-4 capitalize">
                      {user.role}
                    </td>

                    <td className="px-5 py-4 capitalize">
                      {user.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}