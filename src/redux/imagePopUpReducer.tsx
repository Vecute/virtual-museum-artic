import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  // Определяем тип для начального состояния редюсера
  selectedImage: string | null; // Строка, содержащая URL выбранного изображения, или null, если изображение не выбрано
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  selectedImage: null, // Изначально изображение не выбрано
};

// Создаем редюсер imagePopUpReducer
const imagePopUpReducer = createSlice({
  name: "imagePopUp", // Название редюсера, используется для генерации имен экшенов
  initialState, // Начальное состояние редюсера
  reducers: {
    // Объект, содержащий функции-редюсеры для обработки синхронных экшенов
    setSelectedImage: (state, action) => {
      // Редюсер для установки выбранного изображения
      state.selectedImage = action.payload; // Записываем URL выбранного изображения из action.payload в state.selectedImage
    },
  },
});

// Экспортируем action creator setSelectedImage, созданный с помощью imagePopUpReducer.actions
export const { setSelectedImage } = imagePopUpReducer.actions;
// Экспортируем функцию-редюсер, созданную с помощью imagePopUpReducer.reducer
export default imagePopUpReducer.reducer;