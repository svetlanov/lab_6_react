import axios from "axios";

const API_URL = "https://67fbe5891f8b41c816853166.mockapi.io/api";

/**
 * Получает список всех книг из API.
 * 
 * @async
 * @function getAllBooks
 * @returns {Promise<Array>} Массив объектов книг.
 * @throws {Error} Выбрасывает ошибку, если запрос завершился неудачно.
 */
const getAllBooks = async () => {
    try {
        const requestOptions = {
            method: "GET",
            url: `${API_URL}/books`,
        };

        const response = await axios(requestOptions);

        return response.data;
    } catch (error) {
        console.error("Ошибка при запросе книг:", error);
        throw error;
    }
};

/**
 * Получает данные книги по её идентификатору.
 * 
 * @async
 * @function getBook
 * @param {number|string} id - Идентификатор книги.
 * @returns {Promise<Object>} Объект книги.
 * @throws {Error} Выбрасывает ошибку, если запрос завершился неудачно.
 */
const getBook = async (id) => {
    try {
        const requestOptions = {
            method: "GET",
            url: `${API_URL}/books/${id}`,
        };

        const response = await axios(requestOptions);

        return response.data;
    } catch (error) {
        console.error("Ошибка при запросе книги:", error);
        throw error;
    }
};

/**
 * Добавляет новую книгу в API.
 * 
 * @async
 * @function addBook
 * @param {Object} book - Объект книги для добавления.
 * @param {string} book.title - Название книги.
 * @param {string} book.author - Автор книги.
 * @param {string} book.genre - Жанр книги.
 * @param {string} book.language - Язык книги.
 * @param {number} book.year - Год издания книги.
 * @param {string} book.imageUrl - URL изображения книги.
 * @param {Array} book.editions - Массив изданий книги.
 * @returns {Promise<Object>} Объект добавленной книги.
 * @throws {Error} Выбрасывает ошибку, если запрос завершился неудачно.
 */
const addBook = async (book) => {
    try {
        const requestOptions = {
            method: "POST",
            url: `${API_URL}/books`,
            data: book,
        };

        const response = await axios(requestOptions);

        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении книги:", error);
        throw error;
    }
};

export default {
    getAllBooks,
    addBook,
    getBook,
};