// src/components/LojistaDashboard.tsx
'use client';

import { User } from '@supabase/supabase-js';
import { CreateStoreForm } from './CreateStoreForm';
import { AddProductForm } from './AddProductForm';
import { ProductList } from './ProductList';

interface Store {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

interface LojistaDashboardProps {
  user: User;
  store: Store | null;
  products: Product[];
}

export function LojistaDashboard({ user, store, products }: LojistaDashboardProps) {
  if (!store) {
    // Se o lojista ainda não tem uma loja, mostramos o formulário para criar uma.
    return (
      <div>
        <h1 className="text-3xl font-bold">Bem-vindo, {user.email}!</h1>
        <p className="mt-2 text-lg text-neutral-400">
          Para começar a vender, o primeiro passo é cadastrar sua loja. É super rápido!
        </p>
        <div className="mt-8">
          <CreateStoreForm />
        </div>
      </div>
    );
  }

  // Se ele já tem uma loja, mostramos o painel completo.
  return (
    <div>
      <h1 className="text-4xl font-bold text-purple-400">{store.name}</h1>
      <p className="mt-2 text-lg text-neutral-300">Seu painel de vendas rápidas</p>

      <div className="mt-12">
        <AddProductForm storeId={store.id} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Seus Produtos em Promoção</h2>
        <ProductList products={products} />
      </div>
    </div>
  );
}