import { NavLink } from "react-router-dom";
import { House, Users, Gear, List } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="m-4 lg:hidden">
            <List size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SidebarContent closeSidebar={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:flex flex-col w-64 h-screen bg-sidebar text-white p-5 space-y-6">
        <SidebarContent />
      </div>
    </div>
  );
}

function SidebarContent({ closeSidebar }: { closeSidebar?: () => void }) {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Home", url: "/", icon: House },
    { title: "Usuários", url: "/users", icon: Users },
    { title: "Configurações", url: "/settings", icon: Gear },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Deslogado com sucesso!");
    navigate("/login");
  };

  return (
    <nav className="flex flex-col space-y-4 h-full">
      <ModeToggle />
      {menuItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              isActive ? "bg-ring text-foreground" : "text-primary hover:ring hover:text-primary"
            }`
          }
          onClick={closeSidebar}
        >
          <item.icon size={20} />
          {item.title}
        </NavLink>
      ))}
      <Button variant="outline" onClick={handleLogout} className="mt-auto">
        Deslogar
      </Button>
    </nav>
  );
}
