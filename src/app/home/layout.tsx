import HeaderComponent from "@/components/header";
import { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import NeedLogin from "@/components/need-login";

interface HomeLayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: {
    default: "",
    template: "%s | Todo App"
  },
  description: "Todo App for Manage tasks effortlessly. Assign tasks, track progress tracking your todo, using NextJs and PostgreSQL",
};
export default async function HomeLayout({ children }: HomeLayoutProps) {
  const token = (await cookies()).get("token")?.value;
  const result = await fetch(
    `${process.env.API_URL}/api/auth/check-token`,
    { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
  );
  if (!result.ok) {
    return (
      <NeedLogin />
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderComponent />

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
