import { createSlice } from "@reduxjs/toolkit";

// Определяем тип для начального состояния редюсера
type InitialStateType = {
  // selectedImage: Строка, содержащая URL выбранного изображения, или null, если изображение не выбрано
  selectedImage: string | null;
};

// Определяем начальное состояние редюсера
const initialState: InitialStateType = {
  // Изначально изображение не выбрано
  selectedImage: null,
};

// Создаем редюсер imagePopUpReducer с помощью createSlice
const imagePopUpReducer = createSlice({
  // name: Название редюсера, используется для генерации имен экшенов
  name: "imagePopUp",
  // initialState: Начальное состояние редюсера
  initialState,
  // reducers: Объект, содержащий функции-редюсеры для обработки синхронных экшенов.
  reducers: {
    // Редюсер для установки выбранного изображения
    setSelectedImage: (state, action) => {
      // Записываем URL выбранного изображения из action.payload в state.selectedImage
      state.selectedImage = action.payload;
    },
  },
});

// Экспортируем action creator setSelectedImage, созданный с помощью imagePopUpReducer.actions
export const { setSelectedImage } = imagePopUpReducer.actions;
// Экспортируем функцию-редюсер, созданную с помощью imagePopUpReducer.reducer
export default imagePopUpReducer.reducer;