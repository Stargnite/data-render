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
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      {/* <div className="hidden md:flex md:flex-1 md:items-center md:gap-4"></div> */}
      <div className="ml-auto flex items-center gap-2">
        <Link to="/categories">
          <Button
            variant="ghost"
            className="cursor-pointer hover:text-white/70"
          >
            <span className="">Service Categories</span>
          </Button>
        </Link>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-blue-600 underline "
        >
          Logout
        </button>
      </div>
    </header>
  );
}
