import './index.css'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../store/cart/actions';
/**
 * Компонент для отображения заголовка (header) страницы.
 * 
 * @component
 * @returns {JSX.Element} JSX-разметка компонента Header.
 */
function Header() {
    const navigate = useNavigate();

    const totalCartQuantity = useSelector(selectCartItemsCount); //получаем из redux общее кол-во книг в корзине

    return (
      <header>
        <h1>Читалка</h1>
        <div className="navbar">
          <nav>
            <ul>
              <li><div onClick={() => { navigate('/')}}>Главная</div></li>
              <li><div onClick={() => { navigate('/books/add')}}>Добавить книгу</div></li>
              <li><div className="cart-button" onClick={() => { navigate('/cart')}}>Корзина ({totalCartQuantity})</div></li>
            </ul>
          </nav>
        </div>
      </header>
    );
}

export default Header;