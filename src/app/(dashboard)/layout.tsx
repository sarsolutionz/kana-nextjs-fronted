'use client';
import { useEffect } from "react";

// import { Navbar } from "@/components/navbar";
// import { Sidebar } from "@/components/sidebar";

import { EditTeamModal } from "@/features/teams/components/edit-team-modal";
import { CreateTeamModal } from "@/features/teams/components/create-team-modal";
import { CreateNotificationModal } from "@/features/members/components/create-notification-modal";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function FixRadixAriaHidden() {
  useEffect(() => {
    // This removes aria-hidden when elements are focused
    const handleFocus = () => {
      document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
        if (el.contains(document.activeElement)) {
          el.removeAttribute("aria-hidden");
        }
      });
    };

    // Check on focus changes and every 2 seconds
    document.addEventListener("focusin", handleFocus);
    const interval = setInterval(handleFocus, 2000);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      clearInterval(interval);
    };
  }, []);

  return null;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <FixRadixAriaHidden />
      <CreateTeamModal />
      <EditTeamModal />
      <CreateNotificationModal />
      {/* <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="w-full h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div> */}
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </div>
  );
};

export default DashboardLayout;
