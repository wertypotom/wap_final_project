import create from 'zustand'

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info'

export interface ToastMessage {
  id: number
  text: string
  variant: ToastVariant
}

interface ToastStore {
  toasts: ToastMessage[]
  addToast: (text: string, variant?: ToastVariant) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (text, variant = 'info') => {
    const id = Date.now()
    set((s) => ({ toasts: [...s.toasts, { id, text, variant }] }))
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      4000
    )
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
