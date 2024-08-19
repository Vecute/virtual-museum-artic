import React, { memo } from "react";

// Определение интерфейса для пропсов компонента SearchFilters
interface SearchFiltersProps {
  searchTerm: string; // Поисковый запрос
  departmentFilter: string; // Фильтр по департаменту
  placeOfOriginFilter: string; // Фильтр по месту происхождения
  dateStartFilter: string; // Фильтр по начальной дате
  dateEndFilter: string; // Фильтр по конечной дате
  departments: { id: string; title: string }[]; // Список департаментов
  placesOfOrigin: { value: string }[]; // Список мест происхождения
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения поискового запроса
  handleDepartmentFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void; // Обработчик изменения фильтра по департаменту
  handlePlaceOfOriginFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void; // Обработчик изменения фильтра по месту происхождения
  handleDateStartFilterChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void; // Обработчик изменения фильтра по начальной дате
  handleDateEndFilterChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void; // Обработчик изменения фильтра по конечной дате
}

// Компонент SearchFilters для отображения фильтров поиска
const SearchFilters = ({
  searchTerm,
  departmentFilter,
  placeOfOriginFilter,
  dateStartFilter,
  dateEndFilter,
  departments,
  placesOfOrigin,
  handleSearchChange,
  handleDepartmentFilterChange,
  handlePlaceOfOriginFilterChange,
  handleDateStartFilterChange,
  handleDateEndFilterChange,
}: SearchFiltersProps) => {
  // Сортировка списка мест происхождения по алфавиту
  const sortedPlacesOfOrigin = placesOfOrigin.slice().sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  });

  return (
    <div className="filters__container">
      {/* Фильтр по поисковому запросу */}
      <div className="filters__element">
        <h3 className="filters__label">Query</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="filters__input"
        />
      </div>

      {/* Фильтр по департаменту */}
      <div className="filters__element">
        <h3 className="filters__label">Department</h3>
        <select
          value={departmentFilter}
          onChange={handleDepartmentFilterChange}
          className="filters__select"
        >
          <option value="">All departments</option>
          {/* Отображение списка департаментов в выпадающем списке */}
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.title}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по месту происхождения */}
      <div className="filters__element">
        <h3 className="filters__label">Place</h3>
        <select
          value={placeOfOriginFilter}
          onChange={handlePlaceOfOriginFilterChange}
          className="filters__select"
        >
          <option value="">All places</option>
          {/* Отображение отсортированного списка мест происхождения в выпадающем списке */}
          {sortedPlacesOfOrigin.map((place) => (
            <option key={place.value} value={place.value}>
              {place.value}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по дате */}
      <div className="filters__element">
        <h3 className="filters__label">Date</h3>
        <div className="filters__date-container">
          {/* Поле ввода начальной даты */}
          <input
            type="number"
            value={dateStartFilter}
            onChange={handleDateStartFilterChange}
            placeholder="Start Year"
            className="filters__input"
          />
          {/* Поле ввода конечной даты */}
          <input
            type="number"
            value={dateEndFilter}
            onChange={handleDateEndFilterChange}
            placeholder="End Year"
            className="filters__input"
          />
        </div>
      </div>
    </div>
  );
};

// Экспорт мемоизированного компонента SearchFilters для оптимизации производительности
export default memo(SearchFilters);