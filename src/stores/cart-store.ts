import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Product {
  name: string
  done: boolean
  price: number
  quantity: number
}

type State = {
  products: Product[]
}

type Actions = {
  clear: () => void,
  addProduct: (productName: string) => void
  removeProduct: (productName: string) => void
  toggleProductDone: (productName: string) => void
  updateProductQuantity: (productName: string, quantity: number) => void
  updateProductPrice: (productName: string, price: number) => void
}

export const useProducts = create//<State & Actions>(
  (persist<State & Actions>(
    (set) => ({
      products: [],

      clear: () => set({ products: [] }),
      
      addProduct: (productName) => set((state) => ({ 
        products: [...state.products, { name: productName, done: false, price: 0, quantity: 0 }]
      })),
      
      removeProduct: (productName) => set((state) => ({ 
        products:  state.products.filter(product => product.name !== productName)
      })),
      
      toggleProductDone: (productName: string) => set((state) => ({
        products: state.products.map((product) =>
          product.name === productName
            ? { ...product, done: !product.done }
            : product
        ),
      })),

      updateProductQuantity: (productName: string, quantity: number) => set((state) => ({
        products: state.products.map((product) =>
          product.name === productName
            ? { ...product, quantity }
            : product
        ),
      })),

      updateProductPrice: (productName: string, price: number) => set((state) => ({
        products: state.products.map((product) =>
          product.name === productName
            ? { ...product, price }
            : product
        ),
      })),
    }), 
    { 
      name: "mercado:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
