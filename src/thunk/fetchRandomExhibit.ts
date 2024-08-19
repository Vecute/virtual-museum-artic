import { createAsyncThunk } from "@reduxjs/toolkit";

// Создаем асинхронный thunk с помощью createAsyncThunk для получения данных случайного экспоната
export const fetchRandomExhibit = createAsyncThunk(
  // Тип экшена, который будет использоваться для идентификации этого thunk
  "randomExhibit/fetchRandomExhibit",
  // Асинхронная функция, которая выполняет запрос к API и возвращает промис
  async () => {
    // Объявляем переменную для хранения данных случайного экспоната, изначально null
    let randomExhibitData = null;
    // Цикл, который выполняется до тех пор, пока не будет найден экспонат с данными
    while (!randomExhibitData) {
      // Делаем запрос к API, чтобы получить общее количество экспонатов
      const responseTotal = await fetch(
        "https://api.artic.edu/api/v1/artworks?limit=1"
      );
      // Преобразуем ответ в JSON
      const dataTotal = await responseTotal.json();
      // Получаем общее количество экспонатов из ответа API
      const totalObjects = dataTotal.pagination.total;

      // Генерируем случайный ID экспоната в диапазоне от 1 до totalObjects
      const randomId = Math.floor(Math.random() * totalObjects) + 1;

      // Делаем запрос к API, чтобы получить данные экспоната по случайному ID
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/${randomId}`
      );
      // Преобразуем ответ в JSON
      const data = await response.json();
      // Если в ответе есть данные экспоната (data.data не пустое), то сохраняем их в переменную randomExhibitData
      if (data.data) {
        randomExhibitData = data.data;
      // Иначе выводим предупреждение в консоль о том, что экспонат с таким ID не найден
      } else {
        console.warn(`Экспонат с ID ${randomId} не найден.`);
      }
    }
    // Возвращаем данные случайного экспоната
    return randomExhibitData;
  }
);