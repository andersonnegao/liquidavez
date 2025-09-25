// src/components/CreateStoreForm.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';

export function CreateStoreForm() {
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('stores').insert({
        owner_id: user.id,
        name: storeName,
      });

      if (error) {
        setError(error.message);
      } else {
        // Recarrega a página para mostrar o painel completo
        router.refresh();
      }
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Cadastre sua Loja</CardTitle>
        <CardDescription>
          Digite o nome da sua loja para começar a anunciar suas promoções.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateStore}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input
                id="store-name"
                type="text"
                placeholder="Ex: Calçados do Zé"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar Loja e Começar a Vender'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}