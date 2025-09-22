'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { supabase } from '../utils/supabase';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('products').select();

      if (error) {
        console.error('Erro ao buscar dados:', error.message);
      } else {
        const formattedProducts: Product[] = data.map((item: any) => ({
          id: String(item.id),
          name: item.name || 'Sem nome',
          description: item.description || 'Sem descrição',
          price: Number(item.price) || 0,
          image_url: item.image_url || 'https://placehold.co/400x400',
        }));
        setProducts(formattedProducts);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Conectando ao Supabase...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Nossos Produtos</h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image_url={product.image_url}
            />
          ))}
        </div>
      ) : (
        <p className="text-red-500">Não foi possível conectar ou não há produtos na tabela.</p>
      )}
    </div>
  );
}
