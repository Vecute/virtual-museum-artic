import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import TemplatePage from "./TemplatePage";
import { fetchDepartments } from "../thunk/fetchDepartments";
import { useSelector } from "react-redux";
import "../styles/departments.scss";
import { Link, useNavigate } from "react-router-dom";

// Компонент страницы галереи департаментов
function DepartmentsGalleryPage() {
  // Получение списка департаментов из хранилища Redux
  const departments = useSelector(
    (state: RootState) => state.departmentsReducer.departments
  );
  // Хук для работы с dispatch из Redux
  const dispatch = useAppDispatch();
  // Состояние для отслеживания загрузки данных
  const [isLoading, setIsLoading] = useState(true);
  // Хук для навигации
  const navigate = useNavigate();

  // Обработчик кнопки "Назад"
  const handleGoBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории браузера
  };

  // Хук useEffect для загрузки данных о департаментах при монтировании компонента
  useEffect(() => {
    // Асинхронная функция для загрузки данных
    const fetchData = async () => {
      // Вызываем thunk для загрузки данных о департаментах
      await dispatch(fetchDepartments());
      // Сбрасываем состояние загрузки после завершения загрузки
      setIsLoading(false);
    };

    // Вызываем функцию загрузки данных
    fetchData();
  }, [dispatch]);

  return (
    <TemplatePage title="Departments Gallery">
      {/* Условный рендеринг: отображение лоадера, пока данные загружаются */}
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        // Отображение списка департаментов, если данные загружены
        <div className="departments__container">
          {/* Перебор массива departments и отображение каждого департамента */}
          {departments.map((department) => (
            // Компонент Link для создания ссылки на страницу поиска с фильтром по департаменту
            <Link
              key={department.id} // Ключ для списка React
              to={`/search?query[term][department_id]=${department.id}&limit=20&fields=id,title,image_id,department_title`}
              // Ссылка на страницу поиска с параметрами запроса
            >
              <div className="departments__element">
                <h2 className="departments__title">{department.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!isLoading && (<button
        className="back-button back-button__departments"
        onClick={handleGoBack}
      >
        Go back
      </button>
      )}
    </TemplatePage>
  );
}

export default DepartmentsGalleryPage;