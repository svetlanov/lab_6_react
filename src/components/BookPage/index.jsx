/**
 * Компонент страницы книги.
 * Отображает информацию о книге, включая название, автора, год, жанр и издания.
 * Если `bookId` некорректен или книга не найдена, перенаправляет на страницу 404.
 *
 * @component
 */

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Импорт стилей для Skeleton

import BookEdition from '../BookEdition';
import LibraryAPI from '../../api/libraryApi'; // Предполагается, что API доступен

import './index.css';

/**
 * Компонент `BookPage`.
 * Использует `useParams` для получения идентификатора книги из URL и отображает данные книги.
 *
 * @returns {JSX.Element} Разметка страницы книги.
 */
function BookPage() {
    const navigate = useNavigate();
    const { bookId } = useParams();

    if (!bookId || isNaN(Number(bookId))) {
        navigate('/404', { replace: true });
    }

    const [book, setBook] = useState({});
    const [selectedEdition, setSelectedEdition] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        /**
         * Поиск книги по идентификатору.
         * Если книга не найдена, перенаправляет на страницу 404.
         */
        setIsLoading(true);
        LibraryAPI.getBook(bookId)
            .then((response) => {
                setBook(response);
                setSelectedEdition(response.editions.filter((edition) => edition.inStock)[0]);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке книги:", error);
                navigate('/404', { replace: true });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [bookId, navigate]);

    if (isLoading) {
        return (
            <div className="book-page-main">
                <div className="left-side">
                    <Skeleton height={300} width={200} />
                </div>
                <div className="right-side">
                    <Skeleton height={30} width={300} style={{ marginBottom: '10px' }} />
                    <Skeleton height={20} width={200} style={{ marginBottom: '10px' }} />
                    <Skeleton height={20} width={150} style={{ marginBottom: '10px' }} />
                    <Skeleton height={20} width={250} style={{ marginBottom: '10px' }} />
                    <Skeleton height={20} width={300} style={{ marginBottom: '10px' }} />
                </div>
            </div>
        );
    }

    if (!book?.id) {
        return (
            <>
                <h2>Книга не найдена</h2>
            </>
        );
    }

    const onEditionSelect = (edition) => {
        console.log('Selected edition:', edition);
        setSelectedEdition(edition);
    };

    return (
        <>
            <div className="book-page-main">
                <div className="left-side">
                    <img src={book.imageUrl} alt={book.title} />
                </div>
                <div className="right-side">
                    <h2>{book.title}</h2>
                    <p>Автор: {book.author}</p>
                    <p>Год: {book.year}</p>
                    <p>Жанр: {book.genre}</p>
                    <p>Издания:</p>
                    {book.editions.map((edition) => (
                        <BookEdition
                            onSelect={onEditionSelect}
                            key={edition.id}
                            edition={edition}
                            selected={selectedEdition?.edition === edition.edition}
                        />
                    ))}
                    <div className="book-page-buy-row">
                        <button className="add-to-cart" disabled={!selectedEdition?.id}>
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPage;