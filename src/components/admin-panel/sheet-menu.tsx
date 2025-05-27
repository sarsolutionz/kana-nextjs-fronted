import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { Menu } from "@/components/admin-panel/menu";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 pointer-events-none"
            >
              <Image src="/logo.png" alt="logo" width={48} height={48} />
              <div className="flex flex-col">
                <SheetTitle className="font-bold text-lg">
                  Kana Logistics
                </SheetTitle>
                <p className="text-[#113e57] dark:text-white text-xs capitalize">
                  A division of Dr. kana pvt. ltd.
                </p>
              </div>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
