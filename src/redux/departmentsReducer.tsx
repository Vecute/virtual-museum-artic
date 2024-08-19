import { createSlice } from '@reduxjs/toolkit';
import { Department, fetchDepartments } from '../thunk/fetchDepartments';

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  // departments: Массив объектов типа Department, содержащий информацию о департаментах
  departments: Department[];
  // isLoading: Булево значение, указывающее, загружаются ли данные в данный момент
  isLoading: boolean;
  // error: Строка, содержащая сообщение об ошибке, если таковая возникла при загрузке данных
  error: string | null;
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  // Изначально массив departments пуст
  departments: [],
  // По умолчанию данные не загружаются
  isLoading: false,
  // Сообщение об ошибке отсутствует
  error: null,
};

// Создаем редюсер departmentsSlice с помощью createSlice
const departmentsSlice = createSlice({
  // name: Название редюсера, используется для генерации имен экшенов
  name: 'departments',
  // initialState: Начальное состояние редюсера
  initialState,
  // reducers: Объект, содержащий функции-редюсеры для обработки синхронных экшенов.
  // В данном случае редюсер не обрабатывает синхронные экшены
  reducers: {},
  // extraReducers: Функция, принимающая объект builder и позволяющая добавлять обработчики для асинхронных экшенов
  extraReducers: (builder) => {
    // Добавляем обработчики для разных состояний асинхронной функции fetchDepartments
    builder
      // Обработчик для состояния pending (загрузка данных)
      .addCase(fetchDepartments.pending, (state) => {
        // Устанавливаем isLoading в true, чтобы показать, что данные загружаются
        state.isLoading = true;
      })
      // Обработчик для состояния fulfilled (успешная загрузка данных)
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        // Записываем полученные данные в state.departments
        state.departments = action.payload;
        // Устанавливаем isLoading в false, поскольку загрузка завершена
        state.isLoading = false;
      })
      // Обработчик для состояния rejected (ошибка при загрузке данных)
      .addCase(fetchDepartments.rejected, (state, action) => {
        // Устанавливаем isLoading в false, поскольку загрузка завершена (с ошибкой)
        state.isLoading = false;
        // Записываем сообщение об ошибке в state.error
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
});

// Экспортируем функцию-редюсер, созданную с помощью departmentsSlice.reducer
export default departmentsSlice.reducer;