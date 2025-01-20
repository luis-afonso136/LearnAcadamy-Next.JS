"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "../../hooks/use-toast"; // Importa a função de toast

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
  const router = useRouter();

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
        title: "Alterações salvas com sucesso!", variant: 'default',
      }) 
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Erro ao salvar alterações!", variant: 'destructive' 
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
    </>
  );
}
