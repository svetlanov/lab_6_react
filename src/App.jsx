import React from 'react';
import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import BookPage from './components/BookPage'
import NotFoundPage from './components/NotFoundPage';
import BooksPage from './components/BooksPage';
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';

import './App.css'
import ProductForm from './components/ProductForm';

/**
 * Компонент `App`.
 * Основной компонент приложения, который определяет маршруты и их соответствующие компоненты.
 * Использует `react-router` для маршрутизации.
 *
 * @component
 * @returns {JSX.Element} Разметка приложения с определёнными маршрутами.
 */
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BooksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/books/add" element={<ProductForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App;