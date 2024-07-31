"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (localStorage.getItem("user")) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
  return <div>{children}</div>;
};

export default AuthProvider;
