import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import SearchPagination from "../utilities/SearchPagination";
import TemplatePage from "./TemplatePage";
import { fetchDepartments } from "../thunk/fetchDepartments";
import { fetchPlaceOfOrigin } from "../thunk/fetchPlaceOfOrigin";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import "../styles/searchPage.scss";
import SearchFilters from "../components/SearchFilters";
import useFetchArtworks from "../customHooks/useFetchArtworks";

// Компонент страницы поиска
const SearchPage = () => {
  // Получаем параметры URL и функцию для их изменения с помощью useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  // Хук useNavigate для навигации по приложению
  const navigate = useNavigate();
  // Состояние для хранения поискового запроса, инициализируем его значением из параметра URL "q" или пустой строкой
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  // Состояние для хранения фильтра по департаменту, инициализируем его значением из параметра URL "query[term][department_id]" или пустой строкой
  const [departmentFilter, setDepartmentFilter] = useState(
    searchParams.get("query[term][department_id]") || ""
  );
  // Состояние для хранения фильтра по месту происхождения, инициализируем его значением из параметра URL "query[term][place_of_origin.keyword]" или пустой строкой
  const [placeOfOriginFilter, setPlaceOfOriginFilter] = useState(
    searchParams.get("query[term][place_of_origin.keyword]") || ""
  );
  // Состояние для хранения фильтра по начальной дате, инициализируем его значением из параметра URL "query[range][date_start][gte]" или пустой строкой
  const [dateStartFilter, setDateStartFilter] = useState(
    searchParams.get("query[range][date_start][gte]") || ""
  );
  // Состояние для хранения фильтра по конечной дате, инициализируем его значением из параметра URL "query[range][date_end][lte]" или пустой строкой
  const [dateEndFilter, setDateEndFilter] = useState(
    searchParams.get("query[range][date_end][lte]") || ""
  );

  // Состояние для хранения текущей страницы пагинации, инициализируем его значением из параметра URL "page" или 1
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10) || 1
  );

  // Обработчик кнопки "Назад", осуществляет переход на предыдущую страницу в истории браузера
  const handleGoBack = () => {
    navigate(-1);
  };

  // Хук useAppDispatch для получения функции dispatch из хранилища Redux
  const dispatch = useAppDispatch();

  // Получение списка департаментов из хранилища Redux с помощью useSelector
  const departments = useSelector(
    (state: RootState) => state.departmentsReducer.departments
  );

  // Получение списка мест происхождения из хранилища Redux с помощью useSelector
  const placesOfOrigin = useSelector(
    (state: RootState) => state.placeOfOriginReducer.placeOfOrigin
  );

  // Функция для обновления параметров URL, обернутая в useCallback для мемоизации и предотвращения ненужных перевызовов
  const updateSearchParams = useCallback(
    (newParams: { [key: string]: string | undefined }) => {
      setSearchParams((prevParams) => {
        // Создаем новый объект URLSearchParams из текущих параметров URL
        const mergedParams = new URLSearchParams(prevParams);
        // Перебираем новые параметры и устанавливаем их в mergedParams
        for (const key in newParams) {
          if (newParams[key] !== undefined) {
            mergedParams.set(key, newParams[key]);
          }
        }
        // Осуществляем навигацию на новый URL с обновленными параметрами
        navigate(`?${mergedParams.toString()}`);
        // Возвращаем mergedParams для обновления состояния searchParams
        return mergedParams;
      });
    },
    [navigate, setSearchParams]
  );

  // Обработчик изменения значения фильтра
  const handleFilterChange = (
    filterName: string, // Название фильтра
    newValue: string // Новое значение фильтра
  ) => {
    // В зависимости от названия фильтра, обновляем соответствующее состояние
    switch (filterName) {
      case "searchTerm":
        setSearchTerm(newValue);
        break;
      case "departmentFilter":
        setDepartmentFilter(newValue);
        break;
      case "placeOfOriginFilter":
        setPlaceOfOriginFilter(newValue);
        break;
      case "dateStartFilter":
        // Если новое значение начальной даты больше конечной даты, то устанавливаем конечную дату равной начальной
        if (newValue && dateEndFilter && +newValue > +dateEndFilter) {
          setDateEndFilter(newValue);
        }
        setDateStartFilter(newValue);
        break;
      case "dateEndFilter":
        // Если новое значение конечной даты меньше начальной даты, то устанавливаем начальную дату равной конечной
        if (newValue && dateStartFilter && +newValue < +dateStartFilter) {
          setDateStartFilter(newValue);
        }
        setDateEndFilter(newValue);
        break;
      default:
        break;
    }
    // Сбрасываем текущую страницу пагинации на 1
    setCurrentPage(1);
    // Обновляем параметры URL с новыми значениями фильтров и страницы
    updateSearchParams({
      [getSearchParamKey(filterName)]: newValue,
      page: "1",
    });
  };

  // Функция для получения ключа параметра URL в зависимости от названия фильтра
  const getSearchParamKey = (filterName: string): string => {
    switch (filterName) {
      case "searchTerm":
        return "q";
      case "departmentFilter":
        return "query[term][department_id]";
      case "placeOfOriginFilter":
        return "query[term][place_of_origin.keyword]";
      case "dateStartFilter":
        return "query[range][date_start][gte]";
      case "dateEndFilter":
        return "query[range][date_end][lte]";
      default:
        return "";
    }
  };

  // Обработчик изменения страницы пагинации, обернутый в useCallback для мемоизации
  const handlePageChange = useCallback(
    (page: number) => {
      // Обновляем состояние текущей страницы
      setCurrentPage(page);
      // Обновляем параметр URL "page"
      updateSearchParams({ page: page.toString() });
    },
    [updateSearchParams]
  );

  // Используем пользовательский хук useFetchArtworks для получения данных об экспонатах, передавая ему текущие значения фильтров и страницы
  const { results, isLoading, totalPages } = useFetchArtworks(
    searchTerm,
    departmentFilter,
    placeOfOriginFilter,
    dateStartFilter,
    dateEndFilter,
    currentPage
  );

  // Хук useEffect для загрузки списка департаментов и мест происхождения при монтировании компонента
  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchPlaceOfOrigin());
  }, [dispatch]);
  
  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <TemplatePage title="Search through the collection">
      <div>
        <SearchFilters
          searchTerm={searchTerm}
          departmentFilter={departmentFilter}
          placeOfOriginFilter={placeOfOriginFilter}
          dateStartFilter={dateStartFilter}
          dateEndFilter={dateEndFilter}
          departments={departments}
          placesOfOrigin={placesOfOrigin}
          handleSearchChange={(e) =>
            handleFilterChange("searchTerm", e.target.value)
          }
          handleDepartmentFilterChange={(e) =>
            handleFilterChange("departmentFilter", e.target.value)
          }
          handlePlaceOfOriginFilterChange={(e) =>
            handleFilterChange("placeOfOriginFilter", e.target.value)
          }
          handleDateStartFilterChange={(e) =>
            handleFilterChange("dateStartFilter", e.target.value)
          }
          handleDateEndFilterChange={(e) =>
            handleFilterChange("dateEndFilter", e.target.value)
          }
        />
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div
            className={`search__results ${results.length === 0 ? "empty" : ""}`}
          >
            {/* Перебираем массив results и отображаем каждый экспонат */}
            {results.map((result) => (
              <Link key={result.id} to={`/exhibits/${result.id}`}>
                <div className="exhibit__container">
                  <div className="exhibit__image-wrapper">
                    <img
                      src={
                        `https://www.artic.edu/iiif/2/${result.image_id}/full/843,/0/default.jpg` ||
                        "/images/fallback.svg"
                      }
                      alt={result.title}
                      className="exhibit__image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/fallback.svg";
                      }}
                      onLoad={(e) => {
                        const loader = (
                          e.target as HTMLImageElement
                        ).parentNode?.querySelector(".image-loader");
                        if (loader) {
                          (loader as HTMLElement).style.display = "none";
                        }
                      }}
                    />
                    <div className="image-loader">
                      <div className="image-loader__spinner"></div>
                    </div>
                  </div>
                  <h3 className="exhibit__title">{result.title}</h3>
                </div>
              </Link>
            ))}
            {results.length === 0 && (
              <div className="search__empty">
                Unfortunately, nothing was found for your query. Try using a different search query or filtering
              </div>
            )}
          </div>
        )}

        {!isLoading && (
          <SearchPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <button className="back-button" onClick={handleGoBack}>
        Go back
      </button>
    </TemplatePage>
  );
};

export default SearchPage;