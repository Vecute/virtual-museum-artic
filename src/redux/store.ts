import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import { useDispatch } from "react-redux";
import { thunk } from "redux-thunk";
import departmentsReducer from "./departmentsReducer";
import exhibitReducer from "./exhibitReducer";
import placeOfOriginReducer from "./placeOfOriginReducer";
import imagePopUpReducer from "./imagePopUpReducer";
import randomExhibitReducer from "./randomExhibitReducer";

// Создание главного редюсера путем объединения редюсеров с помощью функции combineReducers
const combineReducer = combineReducers({
        themeReducer,         // Редюсер для темы
        departmentsReducer,   // Редюсер для отделов
        exhibitReducer,       // Редюсер для экспонатов
        placeOfOriginReducer, // Редюсер для мест
        imagePopUpReducer,    // Редюсер для картинки в попап
        randomExhibitReducer  // Редюсер для радномного экспоната
    }
)

// Определение типа RootState, который представляет глобальное состояние приложения
export type RootState = ReturnType<typeof combineReducer>;

// Создаем тип AppDispatch, который описывает тип функции dispatch для нашего хранилища
export type AppDispatch = typeof store.dispatch;

// Создание хранилища Redux с помощью функции configureStore и передача главного редюсера в качестве редюсера
export const store = configureStore({
        reducer: combineReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    }
)

// Создаем типизированный хук useAppDispatch для использования dispatch с типами в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>(); 