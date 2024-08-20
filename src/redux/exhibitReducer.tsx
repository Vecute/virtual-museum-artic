import { createSlice } from "@reduxjs/toolkit";
import { fetchExhibitById } from "../thunk/fetchExhibitById";

// Определяем тип Exhibit, описывающий структуру данных об экспонате
export type Exhibit = {
  id: number;
  title: string;
  date_start: number;
  date_end: number;
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  description: string;
  dimensions: string;
  medium_display: string;
  credit_line: string;
  publication_history: string;
  provenance_text: string;
  artwork_type_title: string;
  department_title: string;
  department_id: string;
  image_id: string;
};

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  exhibit: Exhibit | null; // Объект типа Exhibit, содержащий данные об экспонате, или null, если данные не загружены
  isLoading: boolean; // Булево значение, указывающее, загружаются ли данные в данный момент
  error: string | null; // Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных, или null, если ошибки нет
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  exhibit: null, // Изначально данные об экспонате не загружены
  isLoading: false, // По умолчанию данные не загружаются
  error: null, // Сообщение об ошибке отсутствует
};

// Создаем редюсер exhibitSlice
const exhibitSlice = createSlice({
  name: "exhibit", // Название редюсера, используется для генерации имен экшенов
  initialState, // Начальное состояние редюсера
  reducers: {}, // В данном случае редюсер не обрабатывает синхронные экшены
  extraReducers: (builder) => {
    // Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
    builder
      .addCase(fetchExhibitById.pending, (state) => {
        // Обработчик для состояния pending (загрузка данных)
        state.isLoading = true; // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
        state.error = null; // Сбрасываем сообщение об ошибке, так как началась новая загрузка
      })
      .addCase(fetchExhibitById.fulfilled, (state, action) => {
        // Обработчик для состояния fulfilled (успешная загрузка данных)
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена
        state.exhibit = action.payload; // Записываем полученные данные об экспонате в state.exhibit
      })
      .addCase(fetchExhibitById.rejected, (state, action) => {
        // Обработчик для состояния rejected (ошибка при загрузке данных)
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.error = action.error.message || "Something went wrong"; // Записываем сообщение об ошибке в state.error
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью exhibitSlice.reducer
export default exhibitSlice.reducer;