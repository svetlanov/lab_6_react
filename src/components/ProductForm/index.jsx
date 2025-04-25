import { useState } from 'react';
import './index.css'; // Создайте файл стилей для оформления формы
import LibraryAPI from '../../api/libraryApi';
import { useNavigate } from 'react-router';

/**
 * Компонент текстового поля формы.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.title - Название поля.
 * @param {string} props.type - Тип поля ввода.
 * @param {string} props.name - Имя поля.
 * @param {Function} props.onChange - Обработчик изменения значения.
 * @param {string} props.value - Текущее значение поля.
 * @param {Object} props.errors - Объект ошибок для отображения сообщений.
 * @returns {JSX.Element} JSX-разметка текстового поля.
 */
const ProductFormInput = (props) => {
    const { title, type, name, onChange, value, errors } = props;

    const itemError = errors[name] || null;

    return (
        <div className="form-group">
            <label htmlFor={name}>{title}:</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            {itemError && <p className="error-message">{itemError}</p>}
        </div>
    );
};

/**
 * Компонент для отображения полей ввода изданий.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.editions - Список изданий.
 * @param {Function} props.setEditions - Функция для обновления списка изданий.
 * @param {Object} props.errors - Объект ошибок для отображения сообщений.
 * @returns {JSX.Element} JSX-разметка для ввода изданий.
 */
const EditionsFormInput = (props) => {
    const { editions, setEditions, errors } = props;
    const editionsError = errors['editions'] || null;

    /**
     * Обработчик изменения данных издания.
     * 
     * @param {number} index - Индекс издания.
     * @param {string} field - Поле, которое изменяется.
     * @param {string|number|boolean} value - Новое значение поля.
     */
    const handleEditionChange = (index, field, value) => {
        const updatedEditions = [...editions];
        updatedEditions[index][field] = field === 'inStock' ? value === 'true' : value;
        setEditions(updatedEditions);
    };

    /**
     * Добавление нового издания.
     */
    const addEdition = () => {
        setEditions([
            ...editions,
            { edition: '', price: 0, currency: 'MDL', inStock: true },
        ]);
    };

    /**
     * Удаление издания.
     * 
     * @param {number} index - Индекс издания для удаления.
     */
    const removeEdition = (index) => {
        const updatedEditions = editions.filter((_, i) => i !== index);
        setEditions(updatedEditions);
    };

    return (
        <div className="editions-form">
            <h3>Издания</h3>
            {editions.map((edition, index) => (
                <div key={index} className="edition-group">
                    <input
                        className="edition-title-input"
                        type="text"
                        placeholder="Название издания"
                        value={edition.edition}
                        onChange={(e) => handleEditionChange(index, 'edition', e.target.value)}
                    />
                    {errors[`edition-${index}`] && <p className="error-message">{errors[`edition-${index}`]}</p>}

                    <div className="edition-price-group">
                        <input
                            type="number"
                            placeholder="Цена"
                            value={edition.price}
                            onChange={(e) => handleEditionChange(index, 'price', e.target.value)}
                        />
                        <select
                            value={edition.currency}
                            onChange={(e) => handleEditionChange(index, 'currency', e.target.value)}
                        >
                            <option value="MDL">MDL</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    {errors[`price-${index}`] && <p className="error-message">{errors[`price-${index}`]}</p>}

                    <select
                        value={edition.inStock.toString()}
                        onChange={(e) => handleEditionChange(index, 'inStock', e.target.value)}
                    >
                        <option value="true">В наличии</option>
                        <option value="false">Нет в наличии</option>
                    </select>

                    <button className="delete-edition" type="button" onClick={() => removeEdition(index)}>
                        Удалить
                    </button>
                </div>
            ))}
            {editionsError && <p className="error-message">{editionsError}</p>}
            <button type="button" onClick={addEdition}>
                Добавить издание
            </button>
        </div>
    );
};

/**
 * Компонент формы для добавления нового товара.
 * 
 * @component
 * @param {Function} onSubmit - Функция для обработки отправки формы.
 * @returns {JSX.Element} JSX-разметка формы.
 */
const ProductForm = ({ onSubmit }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: 1,
        title: '',
        author: '',
        genre: '',
        language: '',
        year: 2025,
        imageUrl: '',
        editions: [],
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Обработчик изменения полей формы.
     * 
     * @param {Event} e - Событие изменения.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Валидация формы.
     * 
     * @returns {boolean} Возвращает true, если форма валидна.
     */
    const validate = () => {
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = 'Название книги обязательно';
        }

        if (!formData.author) {
            newErrors.author = 'Автор обязателен';
        }

        if (!formData.genre) {
            newErrors.genre = 'Жанр обязателен';
        }

        if (!formData.language) {
            newErrors.language = 'Язык обязателен';
        }

        if (!formData.year) {
            newErrors.year = 'Год должен быть указан';
        }

        if (formData.year > new Date().getFullYear()) {
            newErrors.year = 'Год не может быть больше текущего года';
        }

        if (!formData.imageUrl) {
            newErrors.imageUrl = 'URL изображения обязателен';
        }

        if (formData.editions.length === 0) {
            newErrors.editions = 'Добавьте хотя бы одно издание';
        } else {
            formData.editions.forEach((edition, index) => {
                if (!edition.edition) {
                    newErrors[`edition-${index}`] = 'Название издания обязательно';
                }
                if (!edition.price || edition.price <= 0) {
                    newErrors[`price-${index}`] = 'Цена должна быть больше 0';
                }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Обработчик отправки формы.
     * 
     * @param {Event} e - Событие отправки.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (validate()) {
            LibraryAPI.addBook({ ...formData, id: new Date().valueOf() })
                .then(() => {
                    setErrors({});
                    setFormData({
                        id: 1,
                        title: '',
                        author: '',
                        genre: '',
                        language: '',
                        year: 2025,
                        imageUrl: '',
                        editions: [],
                    });
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении книги:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                    navigate('/'); // Перенаправление на страницу книг
                });
        } else {
            setIsLoading(false);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Добавьте новую книгу</h2>
            <ProductFormInput type="text" name="title" title="Название книги" value={formData.title} onChange={handleChange} errors={errors} />
            <ProductFormInput type="text" name="author" title="Автор" value={formData.author} onChange={handleChange} errors={errors} />
            <ProductFormInput type="text" name="genre" title="Жанр" value={formData.genre} onChange={handleChange} errors={errors} />
            <ProductFormInput type="text" name="language" title="Язык" value={formData.language} onChange={handleChange} errors={errors} />
            <ProductFormInput type="number" name="year" title="Год" value={formData.year} onChange={handleChange} errors={errors} />
            <ProductFormInput type="text" name="imageUrl" title="Картинка" value={formData.imageUrl} onChange={handleChange} errors={errors} />
            <EditionsFormInput editions={formData.editions} setEditions={(editions) => setFormData({ ...formData, editions })} errors={errors} />
            <button type="submit" className="submit-button">Добавить товар</button>
        </form>
    );
};

export default ProductForm;