import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../store/cart/slice";
import { selectCart } from '../../store/cart/actions';
import "./index.css"
/**
 * Компонент `CartPage`.
 * Отображает страницу корзины, где пользователи могут видеть добавленные товары.
 * В текущей реализации отображает сообщение, если корзина пуста.
 *
 * @component
 * @returns {JSX.Element} Разметка страницы корзины.
 */
function CartPage() {
    const dispatch = useDispatch(); //для работы с redux
  const items = useSelector(selectCart); //получаем массив книг из корзины

  const onChangeQuantity = (item, size) => {
    dispatch(updateQuantity({book: item.book, edition: item.edition, quantity: size})); //изменяем кол-во книг в корзине
  }

  const onRemoveFromCart = (item) => {
    dispatch(removeFromCart({book: item.book, edition: item.edition})); //удаляем книгу из корзины
  }

  return (
    <div>
      <h2>Корзина</h2>
        { (!items?.length) && <p>Сейчас корзина пуста</p> }
        {
            items?.map(item => {
                const price = item.book.editions.find(ed => ed.edition === item.edition)?.price; //находим цену книги по выбранному изданию
                return (
                    <div key={item.book.id} className="cart-item">
                        <div className="cart-item-left">
                            <img src={item.book.imageUrl} alt={item.book.title} />
                        </div>
                        <div className="cart-item-center">
                            <div className="cart-item-info">
                                <h3>{item.book.title}</h3>  
                                <span>{item.edition}</span>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div></div>
                                <div className="cart-item-quantity">
                                    <button onClick={() => {onChangeQuantity(item, -1)}}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => {onChangeQuantity(item, 1)}}>+</button>
                                </div>
                                <div></div>
                            </div>
                            <div>
                                <span>Итого: {price * item.quantity} MDL</span>
                            </div>
                        </div>
                        <div className="cart-item-right">
                            <button onClick={() => {onRemoveFromCart(item)}}>Удалить</button>
                        </div>
                    </div>
                )
            })
        }
    </div>
  );
}

export default CartPage;