'use client';

import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';
import { ShoppingBag, Frown } from 'lucide-react';
import React from 'react';

const CartPage = () => {
  const { cart, totalPrice } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh] text-white">
        <Frown size={64} className="text-neutral-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Seu carrinho está vazio</h1>
        <p className="text-neutral-400 max-w-sm">
          Parece que você ainda não adicionou nenhum item. Explore nossos produtos e encontre algo que você ame!
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 lg:py-16">
      <div className="flex items-center gap-4 mb-8">
        <ShoppingBag size={32} className="text-purple-400" />
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white">Seu Carrinho</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <section className="lg:col-span-2">
          <div className="space-y-6">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1 mt-10 lg:mt-0 lg:sticky lg:top-24 h-fit">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-3 text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="font-medium text-green-400">Grátis</span>
              </div>
            </div>
            
            <div className="my-5 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="flex justify-between text-white font-bold text-xl">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              className="group relative w-full mt-6 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-white transition-all hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-800"
            >
              <span className="relative w-full rounded-md bg-neutral-900 px-5 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0">
                Finalizar Compra
              </span>
            </button>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default CartPage;
