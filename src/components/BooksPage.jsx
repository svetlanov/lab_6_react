import BooksList from './BooksList';
import Slider from './Slider';

/**
 * Компонент `BooksPage`.
 * Отображает страницу со списком книг, включая слайдер и список книг.
 *
 * @component
 * @returns {JSX.Element} Разметка страницы со списком книг.
 */
function BooksPage() {
  return (
    <>
        <Slider />
        <BooksList />
    </>
  );
}

export default BooksPage;