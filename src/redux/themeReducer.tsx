import { createSlice } from "@reduxjs/toolkit";

// Определяем константу для названия темной темы
const darkTheme = "dark";
// Получаем сохраненную тему из localStorage
const storedTheme = localStorage.getItem("theme");
// Проверяем, предпочитает ли пользователь темную тему, используя window.matchMedia
const prefersDark =
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
// Определяем начальную тему: если есть сохраненная тема, используем ее, иначе - предпочтения пользователя
const initialTheme = storedTheme ? storedTheme === darkTheme : prefersDark;

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  // darkMode: Булево значение, указывающее, включена ли темная тема
  darkMode: boolean;
};
// Определяем начальное состояние редюсера, используя определенную ранее начальную тему
const initialState: InitialStateType = {
  darkMode: initialTheme,
};

// Создаем редюсер themeReducer с помощью createSlice
const themeReducer = createSlice({
  // name: Название редюсера, используется для генерации имен экшенов
  name: "theme",
  // initialState: Начальное состояние редюсера
  initialState,
  // reducers: Объект, содержащий функции-редюсеры для обработки синхронных экшенов
  reducers: {
    // Редюсер для переключения темы
    toggleTheme: (state) => {
      // Инвертируем значение darkMode, переключая тему на противоположную.
      state.darkMode = !state.darkMode;
    },
  },
});

// Экспортируем action creator toggleTheme, созданный с помощью themeReducer.actions
export const { toggleTheme } = themeReducer.actions;
// Экспортируем функцию-редюсер, созданную с помощью themeReducer.reducer
export default themeReducer.reducer;