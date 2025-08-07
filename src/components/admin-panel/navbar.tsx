"use client";

import { cn } from "@/lib/utils";
import { Mail, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardCommand } from "@/features/dashboard/components/dashboard-command";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <header
        className={cn(
          title === "Dashboard"
            ? "sticky top-0 z-10 w-full dark:shadow-secondary 2xl:px-7"
            : "sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary"
        )}
      >
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
            <h1
              className={cn(
                title === "Dashboard"
                  ? "font-bold hidden text-white sm:block"
                  : "font-bold hidden sm:block"
              )}
            >
              {title}
            </h1>
          </div>
          <div className="flex-1" />
          <div className="grow-[2] shrink px-1">
            <Button
              size="sm"
              variant="outline"
              className="bg-accent/100 hover:bg-accent/90 w-full justify-start h-7 px-2 border"
              onClick={() => setCommandOpen((open) => !open)}
            >
              <Search className="size-4 text-black dark:text-white mr-2" />
              <span className="text-black dark:text-white text-xs">Search </span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">&#8984;</span>K
              </kbd>
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
    </>
  );
}
