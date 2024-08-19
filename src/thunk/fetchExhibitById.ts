import { createAsyncThunk } from '@reduxjs/toolkit';

// Создаем асинхронный thunk с помощью createAsyncThunk
export const fetchExhibitById = createAsyncThunk(
  // Тип экшена, который будет использоваться для идентификации этого thunk
  'posts/fetchExhibitById',
  // Функция, которая выполняет асинхронный запрос и возвращает промис
  async (objectId: number) => { // Функция принимает ID объекта как аргумент
    // Выполняем запрос к API для получения данных об экспонате по его ID
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${objectId}`);
    // Преобразуем ответ в JSON
    const data = await response.json();
    // Возвращаем данные об экспонате из ответа API
    return data.data;
  }
);