// src/components/AddProductForm.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';

export function AddProductForm({ storeId }: { storeId: string }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from('products').insert({
      store_id: storeId,
      name,
      price: Number(price),
      description,
    });

    if (error) {
      alert('Erro ao adicionar produto: ' + error.message);
    } else {
      // Limpa o formulário e recarrega a página para mostrar o novo produto
      setName('');
      setPrice('');
      setDescription('');
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-2xl">Anunciar Nova Promoção</CardTitle>
        <CardDescription>Preencha os dados do produto que você quer liquidar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="product-name">Nome do Produto</Label>
            <Input id="product-name" placeholder="Tênis XPTO" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-price">Preço de Venda (R$)</Label>
            <Input id="product-price" type="number" placeholder="99.90" required value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-desc">Descrição Curta (opcional)</Label>
            <Input id="product-desc" placeholder="Queima de estoque!" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <Button type="submit" className="md:col-span-3" disabled={isLoading}>
            {isLoading ? 'Anunciando...' : 'Colocar à Venda Agora'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}