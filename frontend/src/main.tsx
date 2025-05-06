import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { ToastLayer } from './components/ToastLayer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastLayer />
    <App />
  </StrictMode>
)
