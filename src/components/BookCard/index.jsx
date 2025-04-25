import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../store/cart/slice';

import './index.css';

/**
 * Компонент карточки книги.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.book - Объект книги.
 * @param {string} props.book.title - Название книги.
 * @param {string} props.book.author - Автор книги.
 * @param {number} props.book.year - Год издания книги.
 * @param {string} props.book.genre - Жанр книги.
 * @param {string} props.book.imageUrl - URL изображения книги.
 * @param {Array<Object>} props.book.editions - Список изданий книги.
 * @param {string} props.book.editions[].edition - Название издания.
 * @param {number} props.book.editions[].price - Цена издания.
 * @param {string} props.book.editions[].currency - Валюта цены.
 * @param {boolean} props.book.editions[].inStock - Наличие издания.
 * @returns {JSX.Element} JSX-разметка компонента BookCard.
 */
const BookCard = (props) => {
    const { book } = props; //book-объект с инфой о книге
    const navigate = useNavigate(); //для навигации между страницами
    const dispatch = useDispatch(); //для работы с redux

    /**
     * Состояние для хранения выбранного издания книги.
     * @type {[Object, Function]}
     */
    const [selectedEdition, setSelectedEdition] = useState(book.editions[0]); //по умолч выбрано первое изд-е; setSelectedEdition-функ-я изменения знач-я

    /**
     * Обработчик изменения выбранного издания.
     * 
     * @param {string} editionName - Название выбранного издания.
     */
    const handleEditionChange = (editionName) => { //эту ф-ю вызываем, когда чел выбрал что-то в выпадающ списке
        const edition = book.editions.find((edition) => edition.edition === editionName); 

        setSelectedEdition(edition); //"Теперь показывай на экране это новое издание, которое выбрали (перерисовывай карточку с данными)
    };

    /**
     * Обработчик клика по карточке книги.
     *  
     * @returns {void}
     */
    const onCardClick = () => {
        navigate(`/book/${book.id}`); //перейти на страницу книги
    }

    /**
     * Обработчик добавления книги в корзину.
     * 
     * @returns {void}
     */
    const onAddToCart = () => {
        if (!selectedEdition?.inStock) return; //если нет в наличии, то не добавляем в корзину

        dispatch(addToCart({ book, edition: selectedEdition.edition })); //добавляем в корзину
    }

    return (
        <div class='book-card'>
            <img onClick={onCardClick} src={book.imageUrl}></img> 
            <h2 onClick={onCardClick}>{book.title}</h2>
            <p>Автор: {book.author} - {book.year}</p>
            <p>Жанр: {book.genre}</p>
            <select onChange={(e) => handleEditionChange(e.target.value)}> 
                {book.editions.map((edition) => ( 
                    <option
                        value={edition.edition} 
                        key={edition.id}
                    >
                        {edition.edition}
                    </option>
                ))}
            </select>
            <p>{selectedEdition.inStock ? `${selectedEdition.price} ${selectedEdition.currency}` : 'Нет в наличии'}</p>
            <button onClick={onAddToCart} disabled={!selectedEdition.inStock}>Добавить в корзину</button> 
        </div>
    );
};

export default BookCard;