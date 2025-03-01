import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable/userTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import UserTableSkeleton from "@/components/UserTable/UserTableSkeleton";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", image: "" });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) return;

    const newUserObj: User = {
      id: users.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      image: newUser.image || "https://via.placeholder.com/50",
    };

    setUsers([...users, newUserObj]);
    setNewUser({ firstName: "", lastName: "", email: "", image: "" });
    setIsModalOpen(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Usuários", 10, 10);
    const tableData = users.map(user => [user.id, user.firstName, user.lastName, user.email]);
    
    autoTable(doc, { head: [["ID", "Nome", "Sobrenome", "Email"]], body: tableData });
  
    doc.save("users.pdf");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lista de Usuários</h1>
      
      <div className="flex gap-4">
        <Input
          placeholder="Pesquisar usuário..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsModalOpen(true)}>+ Adicionar Usuário</Button>
        <Button onClick={() => setIsExportModalOpen(true)}>Exportar Dados</Button>
      </div>

      {isLoading ? (
        <UserTableSkeleton />
      ) : (
        <UserTable 
          users={users.filter(user => 
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
          )} 
          onDelete={handleDelete} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalPages={Math.ceil(100 / pageSize)} 
        />
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Usuário</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2">
            <Input 
              placeholder="Nome" 
              value={newUser.firstName} 
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <Input 
              placeholder="Sobrenome" 
              value={newUser.lastName} 
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
            <Input 
              type="email"
              placeholder="E-mail" 
              value={newUser.email} 
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input 
              placeholder="URL do Avatar (Opcional)" 
              value={newUser.image} 
              onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddUser}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Dados</DialogTitle>
          </DialogHeader>
          <p>Escolha o formato para exportar a lista de usuários:</p>
          <div className="flex justify-center gap-4">
            <Button onClick={exportToPDF}>Exportar PDF</Button>
            <Button onClick={exportToExcel}>Exportar Excel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
