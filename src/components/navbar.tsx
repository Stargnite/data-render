import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-10 flex h-16 bg-white text-gray-900 shadow-lg items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      {/* <div className="hidden md:flex md:flex-1 md:items-center md:gap-4"></div> */}
      <div className="ml-auto flex items-center gap-2">
        <Link to="/categories">
          <Button
            variant="ghost"
            className="cursor-pointer font-semibold hover:text-gray-700"
          >
            <span className=""> Categories</span>
          </Button>
        </Link>

        <Button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-[#4C6EF5] text-white hover:bg-[#93a4e7] cursor-pointer"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
