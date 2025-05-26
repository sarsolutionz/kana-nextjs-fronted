import { Mail, Search } from "lucide-react";

import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold hidden sm:block">{title}</h1>
        </div>
        <div className="flex-1" />
        <div className="grow-[2] shrink px-1">
          <Button
            size="sm"
            className="bg-accent/100 hover:bg-accent/90 w-full justify-start h-7 px-2 border"
          >
            <Search className="size-4 text-black dark:text-white mr-2" />
            <span className="text-black dark:text-white text-xs">Search </span>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button
            className="rounded-full w-8 h-8 bg-background mr-2"
            variant="outline"
            size="icon"
          >
            <Mail className="size-5" />
          </Button>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
