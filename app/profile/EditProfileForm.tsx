"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button, buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { AppWindowMacIcon, Bell, Mail, Shield } from "lucide-react";
import { toast } from "../../hooks/use-toast";
import Link from "next/link";

interface User {
  id: string;
  name: string;
}

interface EditProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  // Fetch existing users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

  const handleSendMessage = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: selectedUser.id,
          fromUserId: user.id,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      toast({
        title: `Mensagem enviada para ${selectedUser.name}`,
        description: "O usuário foi notificado",
      });

      setMessage("");
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      toast({
        title: "Alterações salvas com sucesso!",
        variant: "default",
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Erro ao salvar alterações!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <CardHeader className="text-center">
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Informações do utilizador</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <img
              src={user.image || "/images/default-user.png"}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border"
            />
            <div className="space-y-2 text-center">
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">
                Email: {user.email}
              </p>
            </div>
            <div className="flex space-x-4">
              {/* Messages Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Mail className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <p className="px-3 py-1 text-sm text-muted-foreground">
                    Selecionar usuário
                  </p>
                  {users.length > 0 ? (
                    users.map((u) => (
                      <DropdownMenuItem
                        key={u.id}
                        onClick={() => {
                          setSelectedUser(u);
                          setIsDialogOpen(true);
                        }}
                      >
                        {u.name}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      Nenhum usuário encontrado
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>

              {/* Renderiza o botão Admin somente se o e-mail tiver @admin */}
              {user.email.includes("@admin") && (
                <Link href="/Admin">
                  <Button variant="outline" size="icon">
                    <Shield className="w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="text-center">
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>Atualize suas informações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="space-y-1">
                <Label htmlFor="name" className="text-left block">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-left block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                />
                <CardDescription className="text-sm text-muted-foreground text-left block">
                  Email não pode ser modificado
                </CardDescription>
              </div>

              <div className="space-y-1">
                <Label htmlFor="image" className="text-left block">
                  Imagem (URL)
                </Label>
                <Input
                  id="image"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for sending a message */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar mensagem para {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Escreva a mensagem que deseja enviar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendMessage}>Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
