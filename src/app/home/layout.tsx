import HeaderComponent from "@/components/header";
import { Metadata } from "next";
import { ReactNode } from "react";

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
export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderComponent/>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
