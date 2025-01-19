// pages/login.tsx

'use client'; // Adicione esta linha no topo do arquivo
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Lógica de validação simples
    if (!email || !password) {
      setError('Preencha todos os campos!');
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center text-gray-700">
            Faça login na sua conta
          </h2>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-600">
                E-mail
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-600">
                Senha
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="mt-2"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
