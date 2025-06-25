'use client';
import { useEffect } from "react";

import { EditTeamModal } from "@/features/teams/components/edit-team-modal";
import { CreateTeamModal } from "@/features/teams/components/create-team-modal";
import { EditPartnerModal } from "@/features/partners/components/edit-partner-modal";
import { CreatePartnerModal } from "@/features/partners/components/create-partner-modal";
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
      <CreatePartnerModal />
      <EditTeamModal />
      <EditPartnerModal />
      <CreateNotificationModal />
      <AdminPanelLayout>
        {children}
      </AdminPanelLayout>
    </div>
  );
};

export default DashboardLayout;
