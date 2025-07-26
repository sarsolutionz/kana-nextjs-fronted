"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center mb-3">
          <Image src="/logo.png" alt="logo" width={46} height={46} priority />
          {/* asChild becomes Button as a anchor */}
          <Button asChild variant="outline">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
