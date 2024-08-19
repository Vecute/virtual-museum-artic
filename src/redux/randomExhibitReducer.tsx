import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomExhibit } from '../thunk/fetchRandomExhibit';

// Определяем тип RandomExhibit, описывающий структуру данных о случайном экспонате
export type RandomExhibit = { 
    id: number,
    title: string,
    image_id: string,
};

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  // randomExhibit: Объект типа RandomExhibit, содержащий данные о случайном экспонате, или null, если данные не загружены
  randomExhibit: RandomExhibit | null;
  // isLoading: Булево значение, указывающее, загружаются ли данные в данный момент
  isLoading: boolean;
  // error: Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных, или null, если ошибки нет
  error: string | null;
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  // Изначально данные о случайном экспонате не загружены
  randomExhibit: null,
  // По умолчанию данные не загружаются
  isLoading: false,
  // Сообщение об ошибке отсутствует
  error: null,
};

// Создаем редюсер randomExhibitSlice с помощью createSlice
const randomExhibitSlice = createSlice({
  // name: Название редюсера, используется для генерации имен экшенов
  name: 'randomExhibit',
  // initialState: Начальное состояние редюсера
  initialState,
  // reducers: Объект, содержащий функции-редюсеры для обработки синхронных экшенов.
  // В данном случае редюсер не обрабатывает синхронные экшены
  reducers: {},
  // extraReducers: Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
  extraReducers: (builder) => {
    // Добавляем обработчики для разных состояний асинхронной функции fetchRandomExhibit
    builder
      // Обработчик для состояния pending (загрузка данных)
      .addCase(fetchRandomExhibit.pending, (state) => {
        // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
        state.isLoading = true;
        // Сбрасываем сообщение об ошибке, так как началась новая загрузка
        state.error = null;
      })
      // Обработчик для состояния fulfilled (успешная загрузка данных)
      .addCase(fetchRandomExhibit.fulfilled, (state, action) => {
        // Устанавливаем isLoading в false, поскольку загрузка завершена
        state.isLoading = false;
        // Записываем полученные данные о случайном экспонате в state.randomExhibit
        state.randomExhibit = action.payload;
      })
      // Обработчик для состояния rejected (ошибка при загрузке данных)
      .addCase(fetchRandomExhibit.rejected, (state, action) => {
        // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.isLoading = false;
        // Записываем сообщение об ошибке в state.error
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью randomExhibitSlice.reducer
export default randomExhibitSlice.reducer;