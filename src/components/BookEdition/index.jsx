import './index.css'

/**
 * Компонент `BookEdition`.
 * Отображает информацию об издании книги, включая название издания, цену и доступность.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.edition - Объект с информацией об издании.
 * @param {string} props.edition.edition - Название издания.
 * @param {number} props.edition.price - Цена издания.
 * @param {string} props.edition.currency - Валюта цены.
 * @param {boolean} props.edition.inStock - Наличие издания на складе.
 * @param {Function} props.onSelect - Функция, вызываемая при выборе издания.
 * @param {boolean} props.selected - Указывает, выбрано ли текущее издание.
 * @returns {JSX.Element} Разметка для отображения информации об издании книги.
 */
const BookEdition = (props) => {
    const {edition, onSelect, selected} = props;

    const availabilityClass = edition.inStock ? 'available' : 'not-available';
    const selectedClass = selected ? 'selected' : '';

    return (
        <div class={`book-page-edition ${availabilityClass} ${selectedClass}`} onClick={() => onSelect(edition)}>
            <h3>{edition.edition}</h3>
            <span class="price">{edition.price} {edition.currency}</span>
        </div>
    );
}

export default BookEdition;