import { Mail, Search } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="bg-[#113e57] flex items-center justify-between h-15 p-1.5">
      <MobileSidebar />
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="secondary" size="sm">
          <Mail className="size-5 text-[#113e57]" />
        </Button>
      </div>
    </nav>
  );
};
