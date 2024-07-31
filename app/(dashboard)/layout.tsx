import DashboardSidebar from "@/components/DashboardContent";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardSidebar>{children}</DashboardSidebar>;
}
