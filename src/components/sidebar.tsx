import {
  BarChart3,
  // Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar className="icon bg-white text-black shadow-lg border-0">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Package className="h-6 w-6" />
              <span className="font-bold">Admin Panel</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="h-full flex flex-col gap-y-5 py-5 px-1">
          <SidebarMenuItem className="hover:bg-[#4C6EF5] hover:text-white transition-all py-2 rounded-md">
            <SidebarMenuButton asChild isActive>
              <Link to="/">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="hover:bg-[#4C6EF5] hover:text-white transition-all py-2 rounded-md">
            <SidebarMenuButton asChild>
              <Link to="/categories">
                <ShoppingCart />
                <span>All Categories</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="hover:bg-[#4C6EF5] hover:text-white transition-all py-2 rounded-md">
            <SidebarMenuButton asChild>
              <a href="/plans">
                <Users />
                <span>Plans</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="hover:bg-[#4C6EF5] hover:text-white transition-all py-2 rounded-md">
            <SidebarMenuButton asChild>
              <a href="#">
                <BarChart3 />
                <span>Analytics</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="hover:bg-[#4C6EF5] hover:text-white transition-all py-2 rounded-md">
            <SidebarMenuButton asChild>
              <a href="#">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Home />
                <span>Back to Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
