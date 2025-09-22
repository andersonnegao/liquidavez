'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus } from 'lucide-react'; // Ícones para um visual mais limpo

interface CartItemProps {
  item: {
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url: string;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  return (
    // CARD PRINCIPAL: Efeito de vidro fosco (glassmorphism) com borda gradiente sutil
    <div className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      
      {/* IMAGEM: Efeito de "flutuar" no hover e sombra colorida */}
      <div className="relative h-28 w-28 flex-shrink-0">
        <div className="absolute -inset-2 rounded-full bg-purple-500/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
        <Link href={`/products/${item.id}`} className="relative z-10 block h-full w-full">
          <Image
            src={item.image_url}
            alt={item.name}
            className="h-full w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-110"
            width={112}
            height={112}
          />
        </Link>
      </div>

      {/* INFORMAÇÕES DO PRODUTO */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-white transition-colors hover:text-purple-400">
              <Link href={`/products/${item.id}`}>{item.name}</Link>
            </h3>
            <p className="text-xs text-neutral-400">
              {item.description || 'Edição Limitada'}
            </p>
          </div>
          <span className="whitespace-nowrap pl-4 text-xl font-black text-purple-400">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* CONTROLES: Quantidade e Remover */}
        <div className="mt-2 flex items-center justify-between">
          {/* Botões de Quantidade com novo estilo */}
          <div className="flex items-center rounded-full border border-neutral-700 bg-neutral-900/50 p-1">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-purple-500/20 hover:text-white"
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-base font-medium text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-purple-500/20 hover:text-white"
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Botão de Remover (agora um ícone) */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-neutral-400 opacity-50 transition-all duration-300 hover:bg-red-500/50 hover:text-white hover:opacity-100 group-hover:opacity-100"
            aria-label="Remover item do carrinho"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
