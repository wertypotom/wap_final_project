import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { ToastLayer } from './components/ToastLayer.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <ToastLayer />
    <App />
  </>
);
