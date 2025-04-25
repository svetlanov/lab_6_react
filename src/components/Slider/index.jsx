import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Импорт стилей для Skeleton
import LibraryAPI from '../../api/libraryApi'; // Предполагается, что API доступен

import './index.css';

/**
 * Компонент слайдера для отображения книг.
 * 
 * @component
 * @returns {JSX.Element} JSX-разметка компонента Slider.
 */
const Slider = () => { 
    const navigate = useNavigate();

    /**
     * Состояние для хранения списка книг.
     * @type {[Array, Function]}
     */
    const [books, setBooks] = useState([]);

    /**
     * Состояние для хранения текущего слайда.
     * @type {[Object, Function]}
     */
    const [currentSlide, setCurrentSlide] = useState(null);

    /**
     * Состояние для отслеживания загрузки данных.
     * @type {[boolean, Function]}
     */
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Эффект для загрузки данных из API.
     */
    useEffect(() => {
        setIsLoading(true); // Устанавливаем состояние загрузки
        LibraryAPI.getAllBooks()
            .then((response) => {
                setBooks(response);
                setCurrentSlide(response[0]); // Устанавливаем первый слайд
            })
            .catch((error) => {
                console.error("Ошибка при загрузке книг:", error);
            })
            .finally(() => {
                setIsLoading(false); // Завершаем загрузку
            });
    }, []);

    /**
     * Проверяет, является ли индекс нечетным.
     * 
     * @param {number} index - Индекс элемента.
     * @returns {boolean} Возвращает true, если индекс нечетный.
     */
    const isOdd = (index) => index % 2 !== 0;

    /**
     * Эффект для автоматического переключения слайдов каждые 3 секунды.
     */
    useEffect(() => {
        if (!currentSlide || isLoading) return;

        const interval = setInterval(() => { 
            const currentSlideIndex = books.findIndex((book) => book.id === currentSlide.id); // Находим индекс текущей книги
            const nextSlideIndex = currentSlideIndex + 1; // Определяем следующую книгу
            if (nextSlideIndex > (books.length - 1)) { // Если дошли до конца — начинаем сначала
                setCurrentSlide(books[0]);
            } else { // Иначе показываем следующую
                setCurrentSlide(books[nextSlideIndex]);
            }
        }, 3000);
        return () => clearInterval(interval); // Если компонент убрали — остановить таймер
    }, [currentSlide, books, isLoading]);

    /**
     * Обработчик для переключения на следующий слайд.
     */
    const handleNextSlide = () => {
        const currentSlideIndex = books.findIndex((book) => book.id === currentSlide.id);
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex > (books.length - 1)) {
            setCurrentSlide(books[0]);
        } else {
            setCurrentSlide(books[nextSlideIndex]);
        }
    };

    /**
     * Обработчик для переключения на предыдущий слайд.
     */
    const handlePrevSlide = () => {
        const currentSlideIndex = books.findIndex((book) => book.id === currentSlide.id);
        const prevSlideIndex = currentSlideIndex - 1;
        if (prevSlideIndex < 0) {
            setCurrentSlide(books[(books.length - 1)]);
        } else {
            setCurrentSlide(books[prevSlideIndex]);
        }
    };

    /**
     * Обработчик клика по слайду.
     *  
     * @param {Object} book - Книга, на которую кликнули.
     * @returns {void}
     */
    const onSlideClick = (book) => {
        navigate(`/book/${book.id}`); // При клике на слайд переходим на страницу книги
    };

    return (
        <div className="slider">
            {isLoading ? (
                // Эффект скелетона
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Skeleton height={300} width={200} count={1} />
                </div>
            ) : (
                <>
                    <button className="prev-slide-btn" onClick={handlePrevSlide}>←</button>
                    {books.map((book, index) => (
                        <div
                            key={book.id}
                            className={(book.id === currentSlide.id ? 'active-slide' : 'inactive-slide') + ' book-slide' + (isOdd(index) ? ' left-side' : ' right-side')}
                            onClick={() => onSlideClick(book)}
                        >
                            <img className={(isOdd(index)) ? 'left-side-image' : 'right-side-image'} src={book.imageUrl} alt={book.title}></img>
                            <div className={isOdd(index) ? 'right-side-info' : 'left-side-info'}>
                                <h2>{book.title}</h2>
                                <p>Автор: {book.author} - {book.year}</p>
                                <p>Жанр: {book.genre}</p>
                                <div className="editions">
                                    {book.editions.map((edition) => (
                                        <span key={edition.id} className="book-edition">{edition.edition}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="next-slide-btn" onClick={handleNextSlide}>→</button>
                </>
            )}
        </div>
    );
};

export default Slider;