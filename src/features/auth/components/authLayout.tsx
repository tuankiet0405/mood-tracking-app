import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center pt-40 gap-8 background-auth w-dvw h-dvh max-w-dvw overflow-hidden">
      <header>
        <img src="/images/logo.svg" alt="App Logo" className="h-10" />
      </header>
      {children}
    </div>
  );
}
