import './index.css';

/**
 * Компонент для поиска книг.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSearch - Функция-обработчик для обработки изменений строки поиска.
 * @returns {JSX.Element} JSX-разметка компонента Search.
 */
const Search = (props) => {
    const { onSearch } = props; //достаем onSearch -ф-я, которую должен передать родит компонент

    /**
     * Обработчик изменения значения в поле поиска.
     * 
     * @param {Object} e - Событие изменения.
     */
    const handleSearchChange = (e) => { //ф-я обработчик-вызывается каждый раз, когда пользователь что-то печатает в поле поиска
        onSearch(e.target.value); //e.target.value — это текущий текст, который ввёл пользователь
    }//мы передаём этот текст "наружу", чтобы другой компонент (родитель) мог его использовать, например, отфильтровать книги по названию.

    return (
        <div class='search'>
            <input placeholder='Искать книгу...' onChange={handleSearchChange}></input>
        </div> // говорит: "если пользователь меняет текст — вызови функцию handleSearchChange
    );
}

export default Search;