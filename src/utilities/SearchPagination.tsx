import React from "react";
import "../styles/searchPagination.scss";

// Определяем интерфейс для пропсов компонента пагинации
interface PaginationProps {
  // Общее количество страниц
  totalPages: number;
  // Текущая страница
  currentPage: number;
  // Функция обратного вызова, которая будет вызываться при изменении страницы
  onPageChange: (page: number) => void;
}

// Компонент пагинации
const SearchPagination: React.FC<PaginationProps> = ({
  // Деструктуризация пропсов
  totalPages: initialTotalPages, // Начальное общее количество страниц
  currentPage,
  onPageChange,
}) => {
  // Ограничиваем максимальное количество отображаемых страниц до 50 (ограничение API!)
  const totalPages = Math.min(initialTotalPages, 50);

  // Функция для рендеринга номеров страниц
  const renderPageNumbers = () => {
    // Массив для хранения элементов списка (номеров страниц)
    const pageNumbers = [];

    // Если общее количество страниц меньше или равно 5, рендерим все номера страниц
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i} // Устанавливаем ключ для каждого элемента списка
            className={currentPage === i ? "active" : ""} // Добавляем класс "active" к текущей странице
            onClick={() => onPageChange(i)} // Вызываем функцию обратного вызова при клике на номер страницы
          >
            {i}
          </li>
        );
      }
      // Если страниц больше 5, отображаем номера страниц с многоточием
    } else {
      // Добавляем первую страницу
      pageNumbers.push(
        <li
          key={1}
          className={currentPage === 1 ? "active" : ""}
          onClick={() => onPageChange(1)}
        >
          1
        </li>
      );

      // Если текущая страница больше 3, добавляем многоточие в начале
      if (currentPage > 3) {
        pageNumbers.push(
          <li className="search-pagination__ellipsis" key="dots-start">
            ...
          </li>
        );
      }

      // Рассчитываем начальную и конечную страницы для отображения вокруг текущей страницы
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      // Рендерим номера страниц вокруг текущей страницы
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => onPageChange(i)}
          >
            {i}
          </li>
        );
      }

      // Если текущая страница меньше, чем общее количество страниц - 2, добавляем многоточие в конце
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <li className="search-pagination__ellipsis" key="dots-end">
            ...
          </li>
        );
      }

      // Добавляем последнюю страницу
      pageNumbers.push(
        <li
          key={totalPages}
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    // Возвращаем массив элементов списка (номеров страниц)
    return pageNumbers;
  };

  // Рендерим компонент пагинации
  return <ul className="search-pagination">{renderPageNumbers()}</ul>;
};

// Экспортируем компонент пагинации по умолчанию
export default SearchPagination;