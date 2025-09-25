'use client';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CartItem from './CartItem';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Link from 'next/link';

const CartSideBar: React.FC = () => {
  const [isVisable, setIsVisable] = useState(false);
  const { cart, totalPrice, clearCart } = useCartStore();
  const cartItemCount = cart.length;

  const handleOpenCart = () => setIsVisable(true);
  const handleCloseCart = () => setIsVisable(false);

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={handleCloseCart}>
          <div className="z-max fixed inset-y-0 right-0 w-full max-w-sm outline-none focus:outline-none md:w-auto">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-14"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-14"
            >
              <div className="relative z-20">
                <div className="relative h-screen w-full rounded-b-lg bg-neutral-900 text-white p-6 shadow-md md:w-auto">
                  <div className="absolute right-3 top-3">
                    <button onClick={handleCloseCart} className="focus:outline-none">
                      <XMarkIcon className="h-6 w-6 text-neutral-400 hover:text-white" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Seu Carrinho</h3>
                  <div className="mt-8 flex flex-col gap-4 overflow-y-auto hiddenScrollbar" style={{ height: 'calc(100vh - 200px)' }}>
                    {cartItemCount > 0 ? (
                      cart.map((item) => <CartItem key={item.id} item={item} />)
                    ) : (
                      <p className="text-center text-neutral-400">Seu carrinho está vazio.</p>
                    )}
                  </div>
                  {cartItemCount > 0 && (
                    <div className="mt-8">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="mt-5 flex flex-col gap-4">
                        <ButtonPrimary className="w-full">
                          <Link href="/checkout">
                            Finalizar Compra
                          </Link>
                        </ButtonPrimary>
                        <ButtonSecondary onClick={clearCart} className="w-full">
                          Limpar Carrinho
                        </ButtonSecondary>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button onClick={handleOpenCart} className="relative flex items-center justify-center rounded-lg p-2.5 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 fill-current text-white"
          viewBox="0 0 20 20"
        >
          <path
            d="M3 1a1 1 0 000 2h1.22l.142.846a2 2 0 001.996 1.849h9.112a2 2 0 001.996-1.849l.142-.846H17a1 1 0 100-2h-1.22L13.5 6.646a2 2 0 00-1.996 1.849H6.425a2 2 0 00-1.996-1.849L4.78 3H3zM4.78 8.646l.142.846h11.16a2 2 0 011.996 1.849l.142.846H3a1 1 0 100 2h14a1 1 0 100-2h-1.22l-.142-.846a2 2 0 00-1.996-1.849H5.425a2 2 0 00-1.996 1.849L3.78 13H3a1 1 0 100-2h14a1 1 0 100-2h-1.22l-.142-.846a2 2 0 00-1.996-1.849H5.425a2 2 0 00-1.996 1.849L3.78 8.646z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        {cartItemCount > 0 && (
          <span className="absolute inline-flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            {cartItemCount}
          </span>
        )}
      </button>
      {renderContent()}
    </>
  );
};

export default CartSideBar;

