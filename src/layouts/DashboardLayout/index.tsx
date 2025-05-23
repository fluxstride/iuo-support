import { Link, Outlet, useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { Menu, Power, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Loader } from "@/components/Loader";

export default function DashboardLayout() {
  const { toggleSidebar } = useSidebar();

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between border-b pr-3">
          <div className="flex h-16 shrink-0 items-center gap-2 px-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleSidebar()}
              className="cursor-pointer"
            >
              <Menu orientation="vertical" className="h-4" />
            </Button>
            <h1>
              Welcome, <span className="font-bold">{user.name}</span>{" "}
            </h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="profile">
                    <User />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <Power /> Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </>
  );
}
