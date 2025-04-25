// Селектор для получения состояния корзины
export const selectCart = (state) => state.cart.items;

// Селектор для получения общего количества товаров в корзине
export const selectCartItemsCount = (state) => state.cart.totalQuantity;