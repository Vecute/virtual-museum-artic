import { useState, useEffect, useCallback, useRef, act } from "react";

// Базовый URL API музея
const API_BASE_URL = "https://api.artic.edu/api/v1/artworks/search";

// Интерфейс для описания объекта Artwork (экспоната)
interface Artwork {
  id: string;
  title: string;
  image_id: string;
  department_title: string;
  place_of_origin: string;
  date_start: number;
  date_end: number;
}

// Пользовательский хук useFetchArtworks для получения данных об экспонатах
const useFetchArtworks = (
  searchTerm: string, // Поисковый запрос
  departmentFilter: string, // Фильтр по департаменту
  placeOfOriginFilter: string, // Фильтр по месту происхождения
  dateStartFilter: string, // Фильтр по начальной дате
  dateEndFilter: string, // Фильтр по конечной дате
  currentPage: number // Текущая страница
) => {
  // Состояние для хранения результатов поиска (экспонатов)
  const [results, setResults] = useState<Artwork[]>([]);
  // Состояние для отслеживания загрузки данных
  const [isLoading, setIsLoading] = useState(false);
  // Состояние для хранения общего количества страниц
  const [totalPages, setTotalPages] = useState(1);

  // Реф для хранения ID таймера задержки
  const delayTimer = useRef<NodeJS.Timeout | null>(null);
  // Реф для отслеживания первого рендеринга
  const isFirstRender = useRef(true);

  // Функция для построения URL запроса к API, обернутая в useCallback для мемоизации и предотвращения ненужных перевызовов
  const buildApiUrl = useCallback(() => {
    // Создание объекта URL для удобной работы с параметрами запроса
    const url = new URL(API_BASE_URL);
    // Установка параметров запроса
    url.searchParams.set("limit", "20"); // Ограничение количества результатов на странице (20)
    url.searchParams.set("page", currentPage.toString()); // Номер текущей страницы
    url.searchParams.set(
      "fields",
      "id,title,image_id,department_title,place_of_origin,date_start,date_end"
      // Список полей, которые необходимо вернуть в ответе
    );

    // Формирование массива фильтров для запроса
    const filter = [];
    if (searchTerm) {
      // Фильтр по поисковому запросу (поиск по названию)
      filter.push({ match: { title: searchTerm } });
    }
    if (departmentFilter) {
      // Фильтр по департаменту
      filter.push({ term: { department_id: departmentFilter } });
    }
    if (placeOfOriginFilter) {
      // Фильтр по месту происхождения
      filter.push({
        term: { "place_of_origin.keyword": placeOfOriginFilter },
      });
    }
    if (dateStartFilter) {
      // Фильтр по начальной дате (больше или равно)
      filter.push({ range: { date_start: { gte: dateStartFilter } } });
    }
    if (dateEndFilter) {
      // Фильтр по конечной дате (меньше или равно)
      filter.push({ range: { date_end: { lte: dateEndFilter } } });
    }

    // Формирование тела запроса с фильтрами
    const requestBody = {
      query: { bool: { must: filter } },
    };

    // Возвращаем URL и тело запроса
    return { url: url.toString(), body: requestBody };
  }, [
    searchTerm,
    departmentFilter,
    placeOfOriginFilter,
    dateStartFilter,
    dateEndFilter,
    currentPage,
    // Зависимости useCallback - функция будет пересоздана только при изменении одного из этих значений
  ]);

  // Функция для выполнения запроса к API, обернутая в useCallback для мемоизации
  const fetchData = useCallback(async () => {
    setIsLoading(true); // Устанавливаем состояние загрузки
    const { url, body } = buildApiUrl(); // Получаем URL и тело запроса

    try {
      // Выполняем запрос к API
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Парсим ответ от API
      const data = await response.json();
      // Оборачиваем обновления состояния в act только в тестовом окружении:
      if (process.env.NODE_ENV === "test") {
        act(() => {
          setResults(data.data); // Обновляем состояние с результатами поиска
          setTotalPages(data.pagination.total_pages); // Обновляем состояние с общим количеством страниц
          setIsLoading(false); // Сбрасываем состояние загрузки
        });
      } else {
        // В production-коде act не нужен:
        setResults(data.data); // Обновляем состояние с результатами поиска
        setTotalPages(data.pagination.total_pages); // Обновляем состояние с общим количеством страниц
        setIsLoading(false); // Сбрасываем состояние загрузки
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }, [buildApiUrl]);

  // Хук useEffect для выполнения запроса при монтировании компонента и при изменении значений фильтров
  useEffect(() => {
    // Если это первый рендеринг
    if (isFirstRender.current) {
      fetchData(); // Выполняем запрос
      isFirstRender.current = false; // Отмечаем, что первый рендеринг прошел
    } else {
      // Если есть активный таймер задержки, очищаем его
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }

      // Устанавливаем новый таймер задержки перед выполнением запроса (это нужно для предотвращения слишком частых запросов при быстром вводе текста)
      delayTimer.current = setTimeout(() => {
        fetchData();
      }, 500); // Задержка 500 миллисекунд
    }

    // Функция очистки, которая будет вызвана при размонтировании компонента или при следующем вызове useEffect
    return () => {
      // Очищаем таймер задержки, если он активен
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    departmentFilter,
    placeOfOriginFilter,
    dateStartFilter,
    dateEndFilter,
    currentPage,
  ]);

  // Возвращаем результаты поиска, состояние загрузки и общее количество страниц
  return { results, isLoading, totalPages };
};

export default useFetchArtworks;
