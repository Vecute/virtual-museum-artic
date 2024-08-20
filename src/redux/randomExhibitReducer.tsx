import { createSlice } from "@reduxjs/toolkit";
import { fetchRandomExhibit } from "../thunk/fetchRandomExhibit";

export type RandomExhibit = {
  // Определяем тип RandomExhibit, описывающий структуру данных о случайном экспонате
  id: number;
  title: string;
  image_id: string;
};

type InitialStateType = {
  // Определяем тип для начального состояния редюсера
  randomExhibit: RandomExhibit | null; // Объект типа RandomExhibit, содержащий данные о случайном экспонате, или null, если данные не загружены
  isLoading: boolean; // Булево значение, указывающее, загружаются ли данные в данный момент
  error: string | null; // Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных, или null, если ошибки нет
};

const initialState: InitialStateType = {
  // Определяем начальное состояние редюсера
  randomExhibit: null, // Изначально данные о случайном экспонате не загружены
  isLoading: false, // По умолчанию данные не загружаются
  error: null, // Сообщение об ошибке отсутствует
};

// Создаем редюсер randomExhibitSlice
const randomExhibitSlice = createSlice({
  name: "randomExhibit", // Название редюсера, используется для генерации имен экшенов
  initialState, // Начальное состояние редюсера
  reducers: {}, // В данном случае редюсер не обрабатывает синхронные экшены
  extraReducers: (builder) => {
    // Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
    builder
      .addCase(fetchRandomExhibit.pending, (state) => {
        // Обработчик для состояния pending (загрузка данных)
        state.isLoading = true; // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
        state.error = null; // Сбрасываем сообщение об ошибке, так как началась новая загрузка
      })
      .addCase(fetchRandomExhibit.fulfilled, (state, action) => {
        // Обработчик для состояния fulfilled (успешная загрузка данных)
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена
        state.randomExhibit = action.payload; // Записываем полученные данные о случайном экспонате в state.randomExhibit
      })
      .addCase(fetchRandomExhibit.rejected, (state, action) => {
        // Обработчик для состояния rejected (ошибка при загрузке данных)
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.error = action.error.message || "Something went wrong"; // Записываем сообщение об ошибке в state.error
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью randomExhibitSlice.reducer
export default randomExhibitSlice.reducer;