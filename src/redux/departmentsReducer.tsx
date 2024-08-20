import { createSlice } from "@reduxjs/toolkit";
import { Department, fetchDepartments } from "../thunk/fetchDepartments";

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  departments: Department[]; // Массив объектов типа Department, содержащий информацию о департаментах
  isLoading: boolean; // Булево значение, указывающее, загружаются ли данные в данный момент
  error: string | null; // Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  departments: [], // Изначально массив departments пуст
  isLoading: false, // По умолчанию данные не загружаются
  error: null, // Сообщение об ошибке отсутствует
};

// Создаем редюсер
const departmentsSlice = createSlice({
  name: "departments", // Название редюсера
  initialState, // Начальное состояние редюсера
  reducers: {}, // В данном случае редюсер не обрабатывает синхронные экшены
  extraReducers: (builder) => {
    // Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
    builder
      .addCase(fetchDepartments.pending, (state) => {
        // Обработчик для состояния pending (загрузка данных)
        state.isLoading = true; // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        // Обработчик для состояния fulfilled (успешная загрузка данных)
        state.departments = action.payload; // Записываем полученные данные в state.departments
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        // Обработчик для состояния rejected (ошибка при загрузке данных)
        state.isLoading = false; // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.error = action.error.message || "Something went wrong"; // Записываем сообщение об ошибке в state.error
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью departmentsSlice.reducer
export default departmentsSlice.reducer;