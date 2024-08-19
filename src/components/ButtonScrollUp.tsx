import "../styles/buttonScrollUp.scss";
import React, { useState, useEffect } from "react";

// Компонент кнопки прокрутки вверх
const ButtonScrollUp: React.FC = () => {
  // Объявляем состояние isVisible с помощью useState, которое будет хранить, должна ли быть кнопка видна (true) или нет (false)
  const [isVisible, setIsVisible] = useState(false);

  // Функция, которая будет вызываться при прокрутке страницы
  const handleScroll = () => {
    // Если страница прокручена вниз на 300 пикселей или больше, то показываем кнопку
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      // Иначе скрываем кнопку
      setIsVisible(false);
    }
  };

  // Хук useEffect для добавления и удаления обработчика события прокрутки
  useEffect(() => {
    // Добавляем обработчик события 'scroll' к объекту window, который будет вызывать функцию handleScroll при прокрутке страницы
    window.addEventListener("scroll", handleScroll);
    // Возвращаем функцию из useEffect, которая будет удалять обработчик события при размонтировании компонента.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Функция, которая будет вызываться при клике на кнопку
  const scrollToTop = () => {
    // Прокручиваем страницу вверх, используя плавную прокрутку
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Возвращаем кнопку с обработчиком клика и условным классом, который будет показывать или скрывать кнопку в зависимости от значения isVisible
  return (
    <button
      className={`button-scroll-up ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      {/* SVG-иконка стрелки вверх */}
      <svg
        fill="var(--font-color)"
        height="20px"
        width="20px"
        viewBox="0 0 330 330"
      >
        <path
          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
        />
      </svg>
    </button>
  );
};

// Экспортируем компонент ButtonScrollUp по умолчанию
export default ButtonScrollUp;