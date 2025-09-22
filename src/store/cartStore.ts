import { create } from 'zustand';

// Define a interface para o nosso estado
interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

// Cria o nosso "store" usando a função `create` do Zustand
export const useCartStore = create<CartState>((set, get) => {
  // Ação interna para atualizar o preço total
  const updateTotalPrice = () => {
    const { cart } = get();
    const newTotalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    set({ totalPrice: newTotalPrice });
  };

  return {
    cart: [],
    totalPrice: 0,

    // Ação para adicionar um item ao carrinho
    addToCart: (item) => {
      const { cart } = get();
      const itemExists = cart.find(cartItem => cartItem.id === item.id);

      if (itemExists) {
        set(state => ({
          cart: state.cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        }));
      } else {
        set(state => ({
          cart: [...state.cart, { ...item, quantity: 1 }]
        }));
      }

      updateTotalPrice();
    },

    // Ação para remover um item do carrinho
    removeFromCart: (id) => {
      set(state => ({
        cart: state.cart.filter(cartItem => cartItem.id !== id)
      }));
      updateTotalPrice();
    },

    // Ação para aumentar a quantidade de um item
    increaseQuantity: (id) => {
      set(state => ({
        cart: state.cart.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }));
      updateTotalPrice();
    },

    // Ação para diminuir a quantidade de um item
    decreaseQuantity: (id) => {
      const { cart } = get();
      const itemToUpdate = cart.find(cartItem => cartItem.id === id);

      if (itemToUpdate && itemToUpdate.quantity > 1) {
        set(state => ({
          cart: state.cart.map(cartItem =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        }));
      } else {
        get().removeFromCart(id);
      }
      updateTotalPrice();
    },

    // Ação para limpar o carrinho
    clearCart: () => {
      set({ cart: [], totalPrice: 0 });
    },
  };
});
