import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExhibitById } from "../thunk/fetchExhibitById";
import { RootState, useAppDispatch } from "../redux/store";
import TemplatePage from "./TemplatePage";
import "../styles/object.scss";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import { ImageModal } from "../components/ImageModal";

// Компонент страницы экспоната
const ExhibitPage = () => {
  // Хук useAppDispatch, который возвращает функцию dispatch из хранилища Redux
  const dispatch = useAppDispatch();
  // Получаем ID объекта из URL с помощью useParams
  const { objectId } = useParams();
  // Получаем данные об экспонате, состояние загрузки и ошибку из хранилища Redux с помощью useSelector
  const { exhibit, isLoading, error } = useSelector(
    (state: RootState) => state.exhibitReducer
  );
  // Преобразуем ID объекта из строки в число
  const objectIdNumber = objectId ? parseInt(objectId, 10) : null;
  // Хук useNavigate, который возвращает функцию navigate для навигации по приложению
  const navigate = useNavigate();

  // Хук useEffect, который выполняется при монтировании компонента и изменении objectIdNumber
  useEffect(() => {
    // Если objectIdNumber определен, то вызываем thunk для загрузки данных об экспонате
    if (objectIdNumber) {
      dispatch(fetchExhibitById(objectIdNumber));
    }
  }, [objectIdNumber, dispatch]);

  // Условный рендеринг: отображение лоадера, пока данные загружаются
  if (isLoading) {
    return (
      <TemplatePage title="Exhibit is loading">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </TemplatePage>
    );
  }

  // Условный рендеринг: отображение ошибки, если произошла ошибка загрузки
  if (error) {
    return <TemplatePage title={error}></TemplatePage>;
  }

  // Условный рендеринг: отображение сообщения "Exhibit not found", если экспонат не найден
  if (!exhibit) {
    return <TemplatePage title="Exhibit not found" />;
  }

  // Обработчик клика по изображению для открытия модального окна
  const handleOpenImagePopUp = () => {
    // Если у экспоната есть ID изображения, то выполняем следующие действия
    if (exhibit.image_id) {
      // Создаем новый объект Image для предзагрузки изображения
      const img = new Image();
      // Обработчик успешной загрузки изображения
      img.onload = () => {
        // Отправляем action creator для установки URL изображения в модальном окне
        dispatch(
          setSelectedImage(
            `https://www.artic.edu/iiif/2/${exhibit.image_id}/full/843,/0/default.jpg`
          )
        );
      };
      // Обработчик ошибки загрузки изображения
      img.onerror = () => {
        // Устанавливаем URL запасного изображения
        dispatch(setSelectedImage("/images/fallback.svg"));
      };
      // Запускаем предзагрузку изображения
      img.src = `https://www.artic.edu/iiif/2/${exhibit.image_id}/full/843,/0/default.jpg`;
    }
  };

  // Обработчик кнопки "Назад"
  const handleGoBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории браузера
  };

  return (
    <TemplatePage title={exhibit.title}>
      <div className="object__container">
        {exhibit.credit_line && (
          <p className="object__credit">{exhibit.credit_line}</p>
        )}
        <div className="object__info">
          <div className="object__image-wrapper">
            <img
              className="object__image"
              src={
                `https://www.artic.edu/iiif/2/${exhibit.image_id}/full/843,/0/default.jpg` ||
                "/images/fallback.svg"
              }
              alt={exhibit.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/fallback.svg";
              }}
              onClick={handleOpenImagePopUp}
            />
          </div>
          <div className={`object__about`}>
            {exhibit.department_title && (
              <p className="object__text">
                Department: <span>{exhibit.department_title}</span>
              </p>
            )}
            {exhibit.artist_display && (
              <p className="object__text">
                Maker: <span>{exhibit.artist_display} </span>
              </p>
            )}
            {exhibit.place_of_origin && (
              <p className="object__text">
                Place of origin: <span>{exhibit.place_of_origin} </span>
              </p>
            )}
            {exhibit.date_display && (
              <p className="object__text">
                Date: <span>{exhibit.date_display}</span>
              </p>
            )}
            {exhibit.medium_display && (
              <p className="object__text">
                Medium: <span>{exhibit.medium_display}</span>
              </p>
            )}
            {exhibit.dimensions && (
              <p className="object__text">
                Dimensions: <span>{exhibit.dimensions}</span>
              </p>
            )}
            {exhibit.artwork_type_title && (
              <p className="object__text">
                Type: <span>{exhibit.artwork_type_title}</span>
              </p>
            )}
          </div>
          {(exhibit.description ||
            exhibit.publication_history ||
            exhibit.provenance_text) && (
            <div className="extra">
              {exhibit.description && (
                <p className="object__text">
                  Description:{" "}
                  <span>
                    {/* Удаление HTML-тегов и кавычек из текста */}
                    {exhibit.description.replace(/<[^>]+>|"/g, "")}
                  </span>
                </p>
              )}
              {exhibit.publication_history && (
                <p className="object__text">
                  Publication history:{" "}
                  <span>
                    {exhibit.publication_history.replace(/<[^>]+>|"/g, "")}
                  </span>
                </p>
              )}
              {exhibit.provenance_text && (
                <p className="object__text">
                  Origin:{" "}
                  <span>
                    {exhibit.provenance_text.replace(/<[^>]+>|"/g, "")}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
        <button className="back-button" onClick={handleGoBack}>
          Go back
        </button>
      </div>
      <ImageModal />
    </TemplatePage>
  );
};

export default ExhibitPage;