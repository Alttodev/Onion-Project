import { Link, Outlet, useNavigate } from "react-router-dom";
import { User, LogOut, List, Home, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";


import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ScrollTop from "../ScrollTopFunction";
import { useLocalStore } from "../../store/useLocalStore";
import { toastError, toastSuccess } from "../../lib/toast";

export function CustomerLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/home", icon: <Home className="w-4 h-4 mr-2 " /> },
    {
      name: "Orders",
      to: "/orders",
      icon: <ShoppingCart className="w-4 h-4 mr-2" />,
    },
  ];
  const { setToken, user } = useLocalStore();

  const handleLogout = () => {
    try {
      setToken(null);
      navigate("/");
      toastSuccess("Logout successful!");
    } catch (error) {
      toastError(error, "Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex h-16 lg:h-18 items-center justify-between">
              <div className="w-22 md:w-30 h-22  md:h-30 ">
                <Link to="/home">
                  <img
                    src="/src/assets/logo.png"
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight">
                    <Link to="/home">
                      <span className="text-emerald-600">SMA</span>{" "}
                      <span className="text-slate-700">Traders</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="md:hidden">
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-7 h-7 text-emerald-600"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="h-screen p-6 flex flex-col justify-start"
                    >
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                      <ul className="flex flex-col gap-4 mt-2">
                        {navLinks.map((link) => (
                          <li key={link.name}>
                            <Link
                              to={link.to}
                              className="text-slate-700 flex gap-2 items-center font-bold transition-colors duration-200 hover:text-emerald-600"
                              onClick={() => setOpen(false)}
                            >
                              {link.icon}
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex">
                  <ul className="flex items-center gap-4 text-sm md:text-[16px]">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.to}
                          className="text-slate-700 font-bold transition-colors duration-200 relative group"
                          onClick={() => setOpen(false)}
                        >
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="relative cursor-pointer border-0 rounded-full p-1 hover:bg-slate-100 transition-colors duration-200">
                      <Avatar className="h-8 md:h-9 w-8 md:w-9 ring-2 ring-emerald-100">
                        <AvatarImage src="/" alt="User Avatar" />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                          {user?.email?.charAt(0).toUpperCase() || "-"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Toggle user menu</span>
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-full mt-2 border-slate-200 shadow-lg"
                    sideOffset={8}
                  >
                    <DropdownMenuLabel className="text-slate-700 font-semibold">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-200" />

                    <DropdownMenuItem className="group hover:bg-emerald-50 focus:bg-emerald-50 transition-colors duration-200">
                      <User className="mr-1 h-4 w-4 text-slate-500 group-hover:text-emerald-600 transition-colors duration-200" />
                      <span className="text-slate-700 group-hover:text-emerald-700 font-medium">
                        {user?.email}
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-slate-200" />

                    <DropdownMenuItem
                      className="group cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-1 h-4 w-4 text-slate-500 group-hover:text-red-600 transition-colors duration-200" />
                      <span className="text-slate-700 group-hover:text-red-700 font-medium">
                        Logout
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 lg:px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 min-h-[calc(100vh-12rem)]">
            <div className="p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-sm text-slate-600">
                © {new Date().getFullYear()} SMA Traders. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
      <ScrollTop />
    </div>
  );
}
