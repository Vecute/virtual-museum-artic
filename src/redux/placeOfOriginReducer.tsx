import { createSlice } from '@reduxjs/toolkit';
import { PlaceOfOrigin, fetchPlaceOfOrigin } from '../thunk/fetchPlaceOfOrigin';

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  // placeOfOrigin: Массив объектов типа PlaceOfOrigin, содержащий информацию о местах происхождения
  placeOfOrigin: PlaceOfOrigin[];
  // isLoading: Булево значение, указывающее, загружаются ли данные в данный момент
  isLoading: boolean;
  // error: Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных
  error: string | null;
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  // Изначально массив placeOfOrigin пуст
  placeOfOrigin: [],
  // По умолчанию данные не загружаются
  isLoading: false,
  // Сообщение об ошибке отсутствует
  error: null,
};

// Создаем редюсер placeOfOriginSlice с помощью createSlice
const placeOfOriginSlice = createSlice({
  // name: Название редюсера, используется для генерации имен экшенов
  name: 'placeOfOrigin',
  // initialState: Начальное состояние редюсера
  initialState,
  // reducers: Объект, содержащий функции-редюсеры для обработки синхронных экшенов.
  // В данном случае редюсер не обрабатывает синхронные экшены
  reducers: {},
  // extraReducers: Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
  extraReducers: (builder) => {
    // Добавляем обработчики для разных состояний асинхронной функции fetchPlaceOfOrigin
    builder
      // Обработчик для состояния pending (загрузка данных).
      .addCase(fetchPlaceOfOrigin.pending, (state) => {
        // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
        state.isLoading = true;
      })
      // Обработчик для состояния fulfilled (успешная загрузка данных)
      .addCase(fetchPlaceOfOrigin.fulfilled, (state, action) => {
        // Записываем полученные данные в state.placeOfOrigin.
        state.placeOfOrigin = action.payload;
        // Устанавливаем isLoading в false, поскольку загрузка завершена
        state.isLoading = false;
      })
      // Обработчик для состояния rejected (ошибка при загрузке данных)
      .addCase(fetchPlaceOfOrigin.rejected, (state, action) => {
        // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.isLoading = false;
        // Записываем сообщение об ошибке в state.error
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью placeOfOriginSlice.reducer
export default placeOfOriginSlice.reducer;