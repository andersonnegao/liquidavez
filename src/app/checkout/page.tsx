'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';
import ContactInfo from './ContactInfo';
import ShippingAddress from './ShippingAddress';
import PaymentMethod from './PaymentMethod';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Carrinho Vazio</h1>
          <p className="text-neutral-400 mb-8">Adicione alguns produtos ao seu carrinho para continuar.</p>
          <a 
            href="/products" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ver Produtos
          </a>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Informações de Contato', component: ContactInfo },
    { id: 2, title: 'Endereço de Entrega', component: ShippingAddress },
    { id: 3, title: 'Método de Pagamento', component: PaymentMethod },
  ];

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component || ContactInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Finalizar Compra</h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step.id ? 'text-white' : 'text-neutral-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ml-4 ${
                      currentStep > step.id ? 'bg-purple-600' : 'bg-neutral-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <CurrentStepComponent />
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-6 py-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    disabled={currentStep === steps.length}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {currentStep === steps.length ? 'Finalizar' : 'Próximo'}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-white mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold text-white">
                    <span>Total:</span>
                    <span className="text-purple-400">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
