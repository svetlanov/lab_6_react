import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Импорт стилей для Skeleton
import LibraryAPI from '../api/libraryApi';
import BookCard from './BookCard';
import Search from './Search';

/**
 * Компонент для отображения списка книг с возможностью поиска.
 * 
 * @component
 * @returns {JSX.Element} JSX-разметка компонента BooksList.
 */
const BooksList = () => {
    /**
     * Состояние для хранения полного списка книг.
     * @type {[Array, Function]}
     */
    const [books, setBooks] = useState([]);

    /**
     * Состояние для хранения отфильтрованного списка книг.
     * @type {[Array, Function]}
     */
    const [filteredBooks, setFilteredBooks] = useState([]);

    /**
     * Состояние для отслеживания загрузки данных.
     * @type {[boolean, Function]}
     */
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Эффект для инициализации списка книг из данных.
     */
    useEffect(() => {
        setIsLoading(true); // Устанавливаем состояние загрузки
        LibraryAPI.getAllBooks()
            .then((response) => {
                setBooks(response);
                setFilteredBooks(response);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке книг:", error);
            })
            .finally(() => {
                setIsLoading(false); // Завершаем загрузку
            });
    }, []); //сработает только 1 раз

    /**
     * Обработчик поиска книг.
     * 
     * @param {string} searchValue - Значение строки поиска.
     */
    const handleSearch = (searchValue) => {
        const filteredBooks = books.filter((book) => {
            return book.title.toLowerCase().includes(searchValue.toLowerCase());
        });

        setFilteredBooks(filteredBooks);
    };

    return (
        <div>
            {/* Компонент поиска */}
            <Search onSearch={handleSearch} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* Индикатор загрузки */}
                {isLoading ? (
                    // Эффект скелетона
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} style={{ margin: '10px', width: '31%' }}>
                            <Skeleton height={510} />
                            <Skeleton height={20} style={{ marginTop: '10px' }} />
                            <Skeleton height={20} width="80%" />
                        </div>
                    ))
                ) : (
                    <>
                        {/* Карточки книг */}
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.id} // Предполагается, что у книги есть уникальный идентификатор
                                book={book}
                            />
                        ))}
                        {/* Сообщение, если книги не найдены */}
                        {(!filteredBooks.length && !isLoading) ? <p style={{ width: '100%', fontSize: 24 }}>Ничего не найдено</p> : null}
                    </>
                )}
            </div>
        </div>
    );
};

export default BooksList;