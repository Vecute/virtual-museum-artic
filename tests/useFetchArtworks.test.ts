import useFetchArtworks from '../src/customHooks/useFetchArtworks';
import { renderHook, act } from '@testing-library/react';

// Mock для fetch: перехватываем глобальную функцию fetch
global.fetch = jest.fn(() =>
  // Возвращаем фейковый успешный ответ
  Promise.resolve({
    json: () =>
      // Фейковые данные, которые вернет fetch
      Promise.resolve({
        data: [
          {
            id: '1',
            title: 'Test Artwork',
            image_id: 'test-image-id',
            department_title: 'Test Department',
            place_of_origin: 'Test Place',
            date_start: 1900,
            date_end: 1950,
          },
        ],
        pagination: { total_pages: 1 },
      }),
  })
) as jest.Mock;

// Начало тестов для useFetchArtworks
describe('useFetchArtworks', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Очищаем моки перед каждым тестом
  });

  it('изначально возвращает пустой массив результатов, состояние загрузки true и 1 страницу', () => {
    // Рендерим хук с начальными параметрами
    const { result } = renderHook(() => useFetchArtworks('', '', '', '', '', 1)); 

    // Проверяем начальное состояние хука
    expect(result.current.results).toEqual([]); // Результаты должны быть пустым массивом
    expect(result.current.isLoading).toBe(true); // Загрузка должна быть true
    expect(result.current.totalPages).toBe(1); // Общее количество страниц - 1
  });

  it('получает данные при монтировании', async () => {
    const { result } = renderHook(() => useFetchArtworks('', '', '', '', '', 1));

    // act для обновления состояния после асинхронной операции
    await act(async () => {
      // Ожидание завершения асинхронных операций (fetch) 
    });

    // Проверяем состояние после монтирования и выполнения fetch
    expect(fetch).toHaveBeenCalledTimes(1); // fetch должен быть вызван 1 раз
    expect(result.current.results).toHaveLength(1); // В результатах должен быть 1 элемент
    expect(result.current.isLoading).toBe(false); // Загрузка должна быть false
  });

  it('применяет фильтры к запросу', async () => {
    const { result } = renderHook(() =>
      useFetchArtworks('Test', 'Department', 'Place', '1900', '1950', 1) 
    );

    // act для обновления состояния после асинхронной операции
    await act(async () => { 
      // Ожидание завершения асинхронных операций (fetch)
    });

    // Проверяем, что fetch был вызван с правильными параметрами
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        // Проверка URL 
        'https://api.artic.edu/api/v1/artworks/search?limit=20&page=1&fields=id%2Ctitle%2Cimage_id%2Cdepartment_title%2Cplace_of_origin%2Cdate_start%2Cdate_end'
      ),
      expect.objectContaining({
        // Проверка тела запроса
        body: JSON.stringify({
          query: {
            bool: {
              must: [
                { match: { title: 'Test' } },
                { term: { department_id: 'Department' } },
                { term: { 'place_of_origin.keyword': 'Place' } },
                { range: { date_start: { gte: '1900' } } },
                { range: { date_end: { lte: '1950' } } },
              ],
            },
          },
        }),
      })
    );
    expect(result.current.isLoading).toBe(false); // Проверка, что загрузка завершена
  });
});