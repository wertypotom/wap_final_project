import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/products' />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductDetailPage />} />
    </Routes>
  </BrowserRouter>
)
