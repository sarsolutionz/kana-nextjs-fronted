"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";

import { Button } from "@/components/ui/button";

import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link
            href="/"
            className="flex items-center gap-2 pointer-events-none"
          >
            <Image src="/logo.png" alt="logo" width={48} height={48} priority />
            <div className="flex flex-col">
              <h1
                className={cn(
                  "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                  !getOpenState()
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              >
                Kana Logistics
                <p className="text-[#113e57] dark:text-white text-xs capitalize">
                  A division of Dr. kana pvt. ltd.
                </p>
              </h1>
            </div>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
