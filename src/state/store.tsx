import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/*** SUPABASE ***/
import type { Cart, User } from "@/src/utils/supabase";

import { type products } from "@prisma/client";

type State = {
  //cart: any;
  cart: Cart[] | [];
  account: User | null;
};

type Action = {
  addToCart: (product: products) => void;
  removeFromCart: (product: products) => void;
  addQuantity: (product: products) => void;
  subtractQuantity: (product: products) => void;
  clearTrolley: () => void;
  setAccount: (account: State["account"]) => void;
};

export const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.sku === product.sku
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.sku === product.sku
                  ? { ...item, cart_quantity: item.cart_quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                cart_quantity: 1,
              } as Cart,
            ],
          };
        });
      },

      removeFromCart: (product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.sku !== product.sku),
        }));
      },

      addQuantity: (product) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.sku === product.sku
              ? { ...item, cart_quantity: item.cart_quantity + 1 }
              : item
          ),
        }));
      },

      subtractQuantity: (product) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.sku === product.sku
          );

          if (!existingItem) {
            return { cart: state.cart };
          }

          if (existingItem.cart_quantity <= 1) {
            return {
              cart: state.cart.filter((item) => item.sku !== product.sku),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.sku === product.sku
                ? { ...item, cart_quantity: item.cart_quantity - 1 }
                : item
            ),
          };
        });
      },
      clearTrolley: () => set({ cart: [] }),
      account: null,
      setAccount: (account) => set(() => ({ account })),
    }),
    {
      name: "settings", // storage item name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
