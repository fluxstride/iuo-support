import {
  Brain,
  File,
  Home,
  Inbox,
  LucideSchool,
  Sparkle,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
// import iuoLogo from "@/assets/iuo-logo.png";

/**
 * Menu items.
 */
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  // {
  //   title: "Train",
  //   url: "train",
  //   icon: LucideSchool,
  // },
  {
    title: "Train",
    url: "train",
    icon: Brain,
  },
  // {
  //   title: "Knowledge Base",
  //   url: "knowledge-base",
  //   icon: Brain,
  // },
  {
    title: "Inbox",
    url: "inbox",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
];

export function AppSidebar() {
  const { toggleSidebar, openMobile } = useSidebar();
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton>
            {/* <div className="w-5 h-5 p-1 rounded-full bg-[#261a6d]">
              <img src={iuoLogo}  className="w-full "/>
            </div> */}
            <Sparkle className="text-blue-500 w-5" />
            <p className="text-lg font-bold text-blue-500">IUO Support</p>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      `/admin/${item.url}` === pathname
                        ? true
                        : item.url === pathname
                        ? true
                        : false
                    }
                    onClick={() => (openMobile ? toggleSidebar() : null)}
                  >
                    <Link
                      to={item.url}
                      className={cn({
                        "!text-blue-500":
                          `/admin/${item.url}` === pathname
                            ? true
                            : item.url === pathname
                            ? true
                            : false,
                      })}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
