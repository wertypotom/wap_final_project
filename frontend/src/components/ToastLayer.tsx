import React from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import { useToastStore } from '../stores/useToastStore'

export const ToastLayer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return (
    <ToastContainer position='top-end' className='p-3'>
      {toasts.map((t) => (
        <Toast key={t.id} bg={t.variant} onClose={() => removeToast(t.id)}>
          <Toast.Body>{t.text}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}
