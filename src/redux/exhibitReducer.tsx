import { createSlice } from '@reduxjs/toolkit';
import { fetchExhibitById } from '../thunk/fetchExhibitById';

// Определяем тип Exhibit, описывающий структуру данных об экспонате
export type Exhibit = {
    id: number,
    title: string,
    date_start: number,
    date_end: number,
    date_display: string,
    artist_display: string,
    place_of_origin: string,
    description: string,
    dimensions: string,
    medium_display: string,
    credit_line: string,
    publication_history: string,
    provenance_text: string,
    artwork_type_title: string,
    department_title: string,
    department_id: string,
    image_id: string,
};

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  // exhibit: Объект типа Exhibit, содержащий данные об экспонате, или null, если данные не загружены
  exhibit: Exhibit | null;
  // isLoading: Булево значение, указывающее, загружаются ли данные в данный момент
  isLoading: boolean;
  // error: Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных, или null, если ошибки нет
  error: string | null;
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  // Изначально данные об экспонате не загружены
  exhibit: null,
  // По умолчанию данные не загружаются
  isLoading: false,
  // Сообщение об ошибке отсутствует
  error: null,
};

// Создаем редюсер exhibitSlice с помощью createSlice
const exhibitSlice = createSlice({
  // name: Название редюсера, используется для генерации имен экшенов
  name: 'exhibit',
  // initialState: Начальное состояние редюсера
  initialState,
  // reducers: Объект, содержащий функции-редюсеры для обработки синхронных экшенов.
  // В данном случае редюсер не обрабатывает синхронные экшены
  reducers: {},
  // extraReducers: Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
  extraReducers: (builder) => {
    // Добавляем обработчики для разных состояний асинхронной функции fetchExhibitById
    builder
      // Обработчик для состояния pending (загрузка данных)
      .addCase(fetchExhibitById.pending, (state) => {
        // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
        state.isLoading = true;
        // Сбрасываем сообщение об ошибке, так как началась новая загрузка
        state.error = null;
      })
      // Обработчик для состояния fulfilled (успешная загрузка данных)
      .addCase(fetchExhibitById.fulfilled, (state, action) => {
        // Устанавливаем isLoading в false, поскольку загрузка завершена
        state.isLoading = false;
        // Записываем полученные данные об экспонате в state.exhibit
        state.exhibit = action.payload;
      })
      // Обработчик для состояния rejected (ошибка при загрузке данных)
      .addCase(fetchExhibitById.rejected, (state, action) => {
        // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.isLoading = false;
        // Записываем сообщение об ошибке в state.error
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью exhibitSlice.reducer
export default exhibitSlice.reducer;