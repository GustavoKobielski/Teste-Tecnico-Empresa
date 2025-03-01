import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  
  const lastNameCount = users.reduce((acc, user) => {
    acc[user.lastName] = (acc[user.lastName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(lastNameCount).map(([name, count]) => ({ name, count }));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card */}
        <Card className="h-40 w-full">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-xl xl:text-2xl">Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center text-2xl xl:text-3xl font-bold">
            {isLoading ? "Carregando..." : totalUsers}
          </CardContent>
        </Card>

        {/* Card - valor falso */}
        <Card className="h-40 w-full">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-xl xl:text-2xl">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center text-2xl xl:text-3xl font-bold">
            120 {/* Simulando um número fixo */}
          </CardContent>
        </Card>

        {/* Card - valor falso */}
        <Card className="h-40 w-full">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-xl xl:text-2xl">Novos Usuários</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center text-2xl xl:text-3xl font-bold">
            15 {/* Simulando um número fixo */}
          </CardContent>
        </Card>

        {/* Card - valor falso */}
        <Card className="h-40 w-full">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-xl xl:text-2xl">Usuários Premium</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center text-2xl xl:text-3xl font-bold">
            45 {/* Simulando um número fixo */}
          </CardContent>
        </Card>

        {/* Grafico */}
        <div className="col-span-1 md:col-span-2 xl:col-span-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Distribuição por Sobrenome</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <p className="text-gray-500">Nenhum dado disponível</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
