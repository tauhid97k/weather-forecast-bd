"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart,
  Menu,
  ChevronLeft,
  Codesandbox,
  Binoculars,
  CloudHail,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Fetch user role from session
  const { data: session } = useSession();
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden shrink-0">
      {/* Sidebar */}
      <div
        className={`bg-sky-700 text-white h-full transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && <h2 className="text-lg font-bold ">BD Weather</h2>}
          <button onClick={toggleSidebar}>
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-2 px-2 mt-5">
          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label={`Dashboard (${session?.user?.role || "No Role"})`}
            isCollapsed={isCollapsed}
            roles={["super_admin"]}
          />

          {/* Visible to dataentry */}
          <SidebarLink
            href="/dashboard/first-card"
            icon={<CloudHail className="w-5 h-5" />}
            label="First Card"
            isCollapsed={isCollapsed}
            roles={["super_admin", "data_admin", "station_admin"]}
          />

          <SidebarLink
            href="/dashboard/second-card"
            icon={<Binoculars className="w-5 h-5" />}
            label="Second Card"
            isCollapsed={isCollapsed}
            roles={["super_admin", "data_admin", "station_admin"]}
          />

          <SidebarLink
            href="/dashboard/daily-summery"
            icon={<BarChart className="w-5 h-5" />}
            label="Daily Summary"
            isCollapsed={isCollapsed}
            roles={["super_admin", "data_admin", "station_admin"]}
          />

          <SidebarLink
            href="/dashboard/synoptic-code"
            icon={<Codesandbox className="w-5 h-5" />}
            label="Synoptic Code"
            isCollapsed={isCollapsed}
            roles={["super_admin", "data_admin", "station_admin"]}
          />
        </nav>
      </div>
    </div>
  );
};

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  roles?: string[]; // Optional prop for roles
};

const SidebarLink = ({ href, icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full flex items-center gap-3 justify-start ${
          isActive
            ? "bg-gray-200 text-gray-900"
            : "text-white hover:bg-gray-100"
        }`}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export default Sidebar;
