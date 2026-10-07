export type UserRole = "admin" | "developer" | "viewer";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
}