import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "phosphor-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}


export default function UserTable({ users, onDelete, currentPage, setCurrentPage, totalPages }: UserTableProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      onDelete(selectedUserId);
      setIsDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "image",
      header: "Avatar",
      cell: ({ row }) => <img src={row.original.image} alt="Avatar" className="w-10 h-10 rounded-full" />,
    },
    { accessorKey: "firstName", header: "Nome", enableSorting: true },
    { accessorKey: "lastName", header: "Sobrenome", enableSorting: true },
    { accessorKey: "email", header: "E-mail", enableSorting: true },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/user/${row.original.id}`)}>
            Ver Detalhes
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setSelectedUserId(row.original.id);
              setIsDialogOpen(true);
            }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, value) =>
      String(row.getValue(columnId)).toLowerCase().includes(value.toLowerCase()),
    initialState: { pagination: { pageSize: 7 } },
  });

  return (
    <div className="space-y-4 overflow-auto max-h-[800px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" ? <ArrowUp size={16} /> : header.column.getIsSorted() === "desc" ? <ArrowDown size={16} /> : null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Paginação */}
      <div className="flex gap-6 justify-center items-center mt-4">
      <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Próximo
        </Button>
      </div>

      {/* Modal de Confirmação para Excluir */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir este usuário?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
