import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Navigation } from "@/components/navigation";
import { UserButton } from "@/features/auth/components/user-button";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full flex flex-col">
      <Link href="/">
        <div className="flex items-center space-x-2 p-1">
          <Image src="/logo.png" alt="logo" width={48} height={48} />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#113e57]">Kana Logistics</h1>
            <p className="text-[#113e57] text-xs capitalize">
              A division of Dr. kana pvt. ltd.
            </p>
          </div>
        </div>
      </Link>
      <Separator className="my-4" />
      <Navigation />
      <div className="flex flex-col items-start justify-start mt-auto gap-2.5 p-2.5">
        <div className="block">
          <UserButton />
        </div>
      </div>
    </aside>
  );
};
