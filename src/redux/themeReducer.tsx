import { createSlice } from "@reduxjs/toolkit";

const darkTheme = "dark"; // Определяем константу для названия темной темы
const storedTheme = localStorage.getItem("theme"); // Получаем сохраненную тему из localStorage
const prefersDark =
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false; // Проверяем, предпочитает ли пользователь темную тему, используя window.matchMedia
const initialTheme = storedTheme ? storedTheme === darkTheme : prefersDark; // Определяем начальную тему: если есть сохраненная тема, используем ее, иначе - предпочтения пользователя

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  darkMode: boolean; // Булево значение, указывающее, включена ли темная тема
};

const initialState: InitialStateType = {
  // Определяем начальное состояние редюсера, используя определенную ранее начальную тему
  darkMode: initialTheme,
};

// Создаем редюсер themeReducer
const themeReducer = createSlice({
  name: "theme", // Название редюсера, используется для генерации имен экшенов
  initialState, // Начальное состояние редюсера
  reducers: {
    // Объект, содержащий функции-редюсеры для обработки синхронных экшенов
    toggleTheme: (state) => {
      // Редюсер для переключения темы
      state.darkMode = !state.darkMode; // Инвертируем значение darkMode, переключая тему на противоположную
    },
  },
});

// Экспортируем action creator toggleTheme, созданный с помощью themeReducer.actions
export const { toggleTheme } = themeReducer.actions;
// Экспортируем функцию-редюсер, созданную с помощью themeReducer.reducer
export default themeReducer.reducer;