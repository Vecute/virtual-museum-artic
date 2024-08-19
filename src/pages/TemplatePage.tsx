import React from "react";
import "../styles/templatePage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonScrollUp from "../components/ButtonScrollUp";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Определяем интерфейс для пропсов компонента TemplatePage
interface TemplatePageProps {
  title: string; // Заголовок страницы
  children?: React.ReactNode; // Дочерние элементы, которые будут отображаться внутри шаблона страницы
}

// Компонент TemplatePage, представляющий собой шаблон страницы
const TemplatePage = (props: TemplatePageProps) => {
  // Деструктуризация пропсов
  const { title, children } = props;
  // Получаем значение isDarkMode (включена ли темная тема) из хранилища Redux с помощью useSelector
  const isDarkMode = useSelector(
    (state: RootState) => state.themeReducer.darkMode
  );

  return (
    <>
      <Header />
      <div
        className={`background-image ${isDarkMode ? "dark" : "light"}`}
      ></div>
      <div className="page-wrapper">
        <div className="template">
          <div className="main-container">
            <h1 className="template__title">{title}</h1>
            <div className="template__container">{children}</div>
          </div>
        </div>
        <ButtonScrollUp />
        <Footer />
      </div>
    </>
  );
};

export default TemplatePage;