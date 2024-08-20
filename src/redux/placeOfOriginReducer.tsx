import { createSlice } from "@reduxjs/toolkit";
import { PlaceOfOrigin, fetchPlaceOfOrigin } from "../thunk/fetchPlaceOfOrigin";

type InitialStateType = {
  // Определяем тип для начального состояния редюсера
  placeOfOrigin: PlaceOfOrigin[]; // Массив объектов типа PlaceOfOrigin, содержащий информацию о местах происхождения
  isLoading: boolean; // Булево значение, указывающее, загружаются ли данные в данный момент
  error: string | null; // Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  placeOfOrigin: [], // Изначально массив placeOfOrigin пуст
  isLoading: false, // По умолчанию данные не загружаются
  error: null, // Сообщение об ошибке отсутствует
};

// Создаем редюсер placeOfOriginSlice
const placeOfOriginSlice = createSlice({
  name: "placeOfOrigin", // Название редюсера, используется для генерации имен экшенов
  initialState, // Начальное состояние редюсера
  reducers: {}, // В данном случае редюсер не обрабатывает синхронные экшены
  extraReducers: (builder) => {
    // Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
    builder
      .addCase(fetchPlaceOfOrigin.pending, (state) => {
        // Обработчик для состояния pending (загрузка данных).
        state.isLoading = true; // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
      })
      .addCase(fetchPlaceOfOrigin.fulfilled, (state, action) => {
        // Обработчик для состояния fulfilled (успешная загрузка данных)
        state.placeOfOrigin = action.payload; // Записываем полученные данные в state.placeOfOrigin
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена
      })
      .addCase(fetchPlaceOfOrigin.rejected, (state, action) => {
        // Обработчик для состояния rejected (ошибка при загрузке данных)
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.error = action.error.message || "Something went wrong"; // Записываем сообщение об ошибке в state.error
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью placeOfOriginSlice.reducer
export default placeOfOriginSlice.reducer;