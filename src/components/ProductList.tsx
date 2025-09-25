// src/components/ProductList.tsx
'use client';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

export function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="mt-4 text-center text-neutral-400 border-2 border-dashed border-neutral-700 rounded-lg p-8">
        <p>Você ainda não anunciou nenhuma promoção.</p>
        <p>Use o formulário acima para começar a vender!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between items-center bg-neutral-900 p-4 rounded-lg border border-neutral-800">
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-neutral-400">{product.description}</p>
          </div>
          <div className="text-lg font-bold text-green-400">
            R$ {product.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}