import { SignUpCard } from "@/features/auth/components/sign-up-card";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <SignUpCard />
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center flex-col">
        <Image src="/logo.png" alt="Logo" height={100} width={100} />
        <div className="text-center">
          <h1 className="text-2xl text-white">Kana Logistics</h1>
          <p className="text-white text-sm">
            A division of dr. kana private limited
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
