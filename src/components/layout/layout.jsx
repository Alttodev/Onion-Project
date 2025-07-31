import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Home,
  Menu,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users,
  User,
  LogOut,
  CreditCard,
  Handshake,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ScrollToTop } from "../ScrollTop";
import { Button } from "../ui/button";
import { toastSuccess } from "@/lib/toast";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    href: "/home",
    badge: 2,
  },
  // {
  //   title: "Orders",
  //   icon: ShoppingCart,
  //   href: "/orders",
  //   badge: null,
  // },
  // {
  //   title: "Products",
  //   icon: Package2,
  //   href: "/products",
  //   badge: null,
  // },
  // {
  //   title: "Customers",
  //   icon: Users,
  //   href: "/customers",
  //   badge: null,
  // },
  // {
  //   title: "Analytics",
  //   icon: BarChart3,
  //   href: "/analytics",
  //   badge: null,
  // },
  // {
  //   title: "Settings",
  //   icon: Settings,
  //   href: "/settings",
  //   badge: null,
  // },
];

function Sidebar({ className = "" }) {
  const location = useLocation();

  return (
    <div className={`flex h-full w-full flex-col bg-muted/40 ${className}`}>
      {/* Logo Section */}
      <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
        <Link to="/home" className="flex items-center gap-2 font-semibold">
          <ShoppingCart className="h-8 w-8 text-color" />
          <div className="text-sm text-gray-700 font-semibold  md:text-[16px] ">
             <span className="tracking-[1px] text-[16px] font-bold text-[#037F69]">
                SMA <span className="text-gray-800">Traders</span>
              </span>
           
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center text-base gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#037F69] ${
                  isActive ? "bg-muted text-primary" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    year: "numeric",
  });

  const getPageTitle = () => {
    const item = navigationItems.find(
      (item) => item.href === location.pathname
    );
    return item?.title || "Dashboard";
  };

  const handleLogout = () => {
    try {
      navigate("/");
      toastSuccess("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="grid min-h-screen w-full">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 bg-white px-4 lg:h-[60px] lg:px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-transparent cursor-pointer text-color hover:text-color "
              >
                <Menu className="h-3 w-3" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col p-0 [&_button]:cursor-pointer"
            >
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="w-full flex items-center justify-between">
            <h1 className="text-md text-gray-700 font-semibold md:text-[22px]">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-3 text-gray-700 font-semibold md:text-[22px]">
              <span className="tracking-[1.5px] text-lg md:text-[22px] font-bold text-[#037F69]">
                SMA <span className="text-gray-800">Traders</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className=" text-black px-3 py-1 rounded-full text-sm tracking-wide"
              >
                📅 {today}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback className="text-color">A</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-5">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="group hover:text-[#037F69]">
                    <User className="mr-2 h-4 w-4 group-hover:text-[#037F69]" />
                    <span className="group-hover:text-[#037F69]">Anish</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="group hover:text-[#037F69] cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4 group-hover:text-[#037F69]" />
                    <span
                      className="group-hover:text-[#037F69]"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>

        {/* ✅ Footer Section */}
        <footer className="bg-white text-center text-sm text-gray-600 py-4">
          © {new Date().getFullYear()} SMA Traders. All rights reserved.
        </footer>
      </div>

      <ScrollToTop />
    </div>
  );
}
