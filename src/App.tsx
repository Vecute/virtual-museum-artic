import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DepartmentsGalleryPage from "./pages/DepartmentsGalleryPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ExhibitPage from "./pages/ObjectPage";
import AboutPage from "./pages/AboutPage";
import SearchPage from "./pages/SearchPage";
import MainPage from "./pages/MainPage";
import RandomExhibitPage from "./pages/RandomExhibitPage";
import ProjectAboutPage from "./pages/ProjectAboutPage";

function App() {
  return (
    // Оборачиваем приложение в Provider, чтобы сделать хранилище Redux доступным для всех компонентов
    <Provider store={store}>
      {/* Оборачиваем приложение в BrowserRouter для включения маршрутизации */}
      <BrowserRouter>
        {/* Компонент Routes используется для определения маршрутов приложения */}
        <Routes>
          {/* Маршрут по умолчанию, перенаправляющий на страницу "/home" */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Маршрут для страницы галереи департаментов */}
          <Route path="/departments" element={<DepartmentsGalleryPage />} />
          {/* Маршрут для страницы "About" */}
          <Route path="/about" element={<AboutPage />} />
          {/* Маршрут для главной страницы */}
          <Route path="/home" element={<MainPage />} />
          {/* Маршрут для всех неопределенных маршрутов, перенаправляющий на главную страницу */}
          <Route path="*" element={<MainPage />} />
          {/* Маршрут для страницы экспоната, получающий идентификатор объекта из URL */}
          <Route path="/exhibits/:objectId" element={<ExhibitPage />} />
          {/* Маршрут для страницы поиска */}
          <Route path="/search" element={<SearchPage />} />
          {/* Маршрут для страницы случайного экспоната */}
          <Route path="/random" element={<RandomExhibitPage />} />
          {/* Маршрут для страницы об авторе сайта и проекте в целом */}
          <Route path="/project-about" element={<ProjectAboutPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;