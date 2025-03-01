import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);

    setTimeout(() => {
      
      setIsEditing(false);
      setIsLoading(false);
      toast.success("Usuário atualizado com sucesso!");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Voltar
      </Button>

      <Card className="max-w-lg mx-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl">Detalhes do Usuário</CardTitle>
          {isLoading ? (
            <Skeleton className="w-24 h-24 rounded-full mt-4" />
          ) : (
            <img src={formData.image} alt={formData.firstName} className="w-24 h-24 rounded-full mt-4" />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>
            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <Input name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} />
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Sobrenome</label>
            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <Input name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
            )}
          </div>

          <div>
            <label className="text-sm font-medium">E-mail</label>
            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <Input name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Avatar (URL)</label>
            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <Input name="image" value={formData.image} onChange={handleChange} disabled={!isEditing} />
            )}
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Editar Usuário</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
