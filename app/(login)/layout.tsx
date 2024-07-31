import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="ct min-h-[100vh]">
      {/* add a linear gradient to the below div */}
      <div className="rounded-xl bg-gradient-to-r from-[#f7f7f7] to-[#f0f0f0] text-black flex items-center justify-center p-12">
        <div className="">
          <div className="font-semibold text-[48px] px-10">
            Welcome to <span className="text-[#4534ac]">Workflo</span>!
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
