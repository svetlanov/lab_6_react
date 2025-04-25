import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {Object} CartItem
 * @property {Object} book - Объект книги.
 * @property {string} book.id - Уникальный идентификатор книги.
 * @property {string} edition - Издание книги.
 * @property {number} quantity - Количество экземпляров книги.
 */

/**
 * @typedef {Object} CartState
 * @property {CartItem[]} items - Список товаров в корзине.
 * @property {number} totalQuantity - Общее количество товаров в корзине.
 */

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Добавляет товар в корзину.
     * @param {CartState} state - Текущее состояние корзины.
     * @param {Object} action - Действие Redux.
     * @param {Object} action.payload - Данные для добавления товара.
     * @param {Object} action.payload.book - Объект книги.
     * @param {string} action.payload.book.id - Уникальный идентификатор книги.
     * @param {string} action.payload.edition - Издание книги.
     */
    addToCart(state, action) {
      const { id } = action.payload?.book;
      if (!id) return; // Если id не передан, то ничего не делаем
      const { edition } = action.payload;
      const existingItem = state.items.find(item => item.book.id === id && item.edition === edition);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },

    /**
     * Удаляет товар из корзины.
     * @param {CartState} state - Текущее состояние корзины.
     * @param {Object} action - Действие Redux.
     * @param {Object} action.payload - Данные для удаления товара.
     * @param {Object} action.payload.book - Объект книги.
     * @param {string} action.payload.book.id - Уникальный идентификатор книги.
     * @param {string} action.payload.edition - Издание книги.
     */
    removeFromCart(state, action) {
      const { id } = action.payload?.book;
      if (!id) return; // Если id не передан, то ничего не делаем
      const { edition } = action.payload;
      const existingItem = state.items.find(item => item.book.id === id && item.edition === edition);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => !(item.book.id === id && item.edition === edition));
      }
    },

    /**
     * Обновляет количество товара в корзине.
     * @param {CartState} state - Текущее состояние корзины.
     * @param {Object} action - Действие Redux.
     * @param {Object} action.payload - Данные для обновления количества.
     * @param {Object} action.payload.book - Объект книги.
     * @param {string} action.payload.book.id - Уникальный идентификатор книги.
     * @param {string} action.payload.edition - Издание книги.
     * @param {number} [action.payload.quantity=1] - Изменение количества (может быть отрицательным).
     */
    updateQuantity(state, action) {
      const { id } = action.payload?.book;
      if (!id) return; // Если id не передан, то ничего не делаем
      const { edition, quantity = 1 } = action.payload;

      const existingItem = state.items.find(item => item.book.id === id && item.edition === edition);
      if (existingItem) {
        existingItem.quantity += quantity;
        state.totalQuantity += quantity;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => !(item.book.id === id && item.edition === edition));
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;