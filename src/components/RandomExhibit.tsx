import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRandomExhibit } from "../thunk/fetchRandomExhibit";
import { RootState, useAppDispatch } from "../redux/store";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import { ImageModal } from "../components/ImageModal";
import "../styles/randomObject.scss";
import { useNavigate } from "react-router-dom";

// Компонент RandomExhibit для отображения случайного экспоната
const RandomExhibit = () => {
  // Хук для работы с dispatch из Redux
  const dispatch = useAppDispatch();
  // Хук для навигации
  const navigate = useNavigate();
  // Получение данных из хранилища Redux
  const { randomExhibit, isLoading, error } = useSelector(
    (state: RootState) => state.randomExhibitReducer
  );
  // Реф для доступа к элементу изображения
  const imageRef = useRef<HTMLImageElement>(null);
  // Состояние для отслеживания загрузки изображения
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Обработчик кнопки "Назад"
  const handleGoBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории
  };

  // Хук useEffect для загрузки случайного экспоната при монтировании компонента
  useEffect(() => {
    // Если экспонат не загружен, вызываем thunk для его загрузки
    if (!randomExhibit) {
      dispatch(fetchRandomExhibit());
    }
  }, [dispatch, randomExhibit]);

  // Обработчик кнопки "Следующий экспонат"
  const handleNextExhibit = () => {
    setIsImageLoading(true); // Показываем лоадер изображения
    dispatch(fetchRandomExhibit()); // Вызываем thunk для загрузки нового случайного экспоната
  };

  // Обработчик клика по изображению для открытия модального окна
  const handleOpenImagePopUp = () => {
    // Если у экспоната есть ID изображения, отправляем действие в Redux для открытия модального окна
    if (randomExhibit?.image_id) {
      dispatch(
        setSelectedImage(
          `https://www.artic.edu/iiif/2/${randomExhibit.image_id}/full/843,/0/default.jpg`
        )
      );
    }
  };

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    // При ошибке пытаемся загрузить новый случайный экспонат
    dispatch(fetchRandomExhibit());
  };

  // Отображение лоадера, если данные загружаются
  if (isLoading) {
    return (
      <div className="random-object__loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Отображение ошибки, если произошла ошибка загрузки
  if (error) {
    return <div className="random-object__error">Error: {error}</div>;
  }

  // Отображение данных экспоната, если он загружен
  return (
    <div className="random-object__container">
      {/* Если экспонат загружен, отображаем его данные */}
      {randomExhibit ? (
        <>
          {/* Отображение лоадера, если изображение загружается */}
          {isImageLoading && (
            <div className="random-object__loading">
              <div className="spinner"></div>
            </div>
          )}
          {/* Отображение названия экспоната, если изображение не загружается */}
          {!isImageLoading && (
            <h2 className="random-object__title">{randomExhibit.title}</h2>
          )}
          {/* Контейнер для изображения */}
          <div className="random-object__image-wrapper">
            {/* Изображение экспоната */}
            <img
              ref={imageRef}
              className="random-object__image"
              src={
                // Формирование URL изображения из API музея
                `https://www.artic.edu/iiif/2/${randomExhibit.image_id}/full/843,/0/default.jpg` ||
                // Запасное изображение, если URL не найден
                "/images/fallback.svg"
              }
              alt={randomExhibit.title} // Альтернативный текст для изображения
              onLoad={() => setIsImageLoading(false)} // Скрываем лоадер после загрузки изображения
              onError={handleImageError} // Обработчик ошибки загрузки
              onClick={handleOpenImagePopUp} // Обработчик клика по изображению
              style={{ display: isImageLoading ? "none" : "block" }} // Скрываем изображение, пока оно загружается
            />
          </div>
          {/* Контейнер для кнопок */}
          {!isImageLoading && (
            <div className="random-object__button-container">
              {/* Кнопка "Назад" */}
              <button className="back-button" onClick={handleGoBack}>
                Go back
              </button>
              {/* Кнопка "Следующий экспонат" */}
              <button
                className="random-object__button"
                onClick={handleNextExhibit}
              >
                Next Exhibit
              </button>
            </div>
          )}
        </>
      ) : (
        // Отображение сообщения о загрузке, если экспонат не загружен
        <div className="random-object__title">Loading exhibit...</div>
      )}
      {/* Модальное окно для просмотра изображения */}
      <ImageModal />
    </div>
  );
};

export default RandomExhibit;