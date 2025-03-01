import { GalleryVerticalEnd } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { toast } from "sonner";


export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
   if (email === "admin@email.com" && password === "123456") {
     localStorage.setItem("token", "fake-jwt-token");
     toast.success("Login realizado com sucesso!"); 
     setTimeout(() => navigate("/"), 1500); 
   } else {
     toast.error("Credenciais inválidas!");
   }
 };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Teste Técnico
        </a>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}