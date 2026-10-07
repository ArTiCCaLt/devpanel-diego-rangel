import type { User } from "@/types/user";

const users: User[] = [
  {
    id: 1,
    name: "Diego Rangel",
    email: "diego@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Ana Torres",
    email: "ana@example.com",
    role: "developer",
    status: "active",
  },
  {
    id: 3,
    name: "Carlos Méndez",
    email: "carlos@example.com",
    role: "viewer",
    status: "inactive",
  },
  {
    id: 4,
    name: "Laura Gómez",
    email: "laura@example.com",
    role: "developer",
    status: "active",
  },
  {
    id: 5,
    name: "Daniel Ruiz",
    email: "daniel@example.com",
    role: "viewer",
    status: "active",
  },
];

export function getUsers(search = "") {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return users;
  }

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch) ||
      user.role.toLowerCase().includes(normalizedSearch)
  );
}

export function getUserMetrics() {
  return {
    total: users.length,
    active: users.filter((user) => user.status === "active").length,
  };
}