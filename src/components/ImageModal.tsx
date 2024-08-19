import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import '../styles/modalImage.scss';

export const ImageModal = () => {
  // Использование хука useSelector для получения выбранного изображения из состояния Redux
  const selectedImage = useSelector((state: RootState) => state.imagePopUpReducer.selectedImage);

  // Использование хука useDispatch для создания функции dispatch, которая позволяет отправлять действия в Redux
  const dispatch = useDispatch();

  // Использование хука useEffect для установки стиля overflow для body в зависимости от того, выбрано ли изображение
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  // Объявление функции handleClose, которая отправляет действие setSelectedImage с null в Redux, сбрасывая выбранное изображение
  const handleClose = () => {
    const modal = document.querySelector('.modal-image');
    if (modal) {
      modal.classList.add("hidden"); // Добавляем класс hidden для анимации закрытия
    }
    setTimeout(() => {
        dispatch(setSelectedImage(null)); // Закрываем модальное окно с задержкой, чтобы успела отработать анимация
    }, 300);
  };

  // Использование хука useEffect для добавления обработчика событий, который закрывает модальное окно при клике вне изображения
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalImage = document.querySelector(".modal-image__image");
      if (modalImage && !modalImage.contains(event.target as Node)) {
        handleClose();
      }
    };

    // Добавление обработчика событий на документ
    document.addEventListener("mousedown", handleClickOutside);

    // Удаление обработчика событий при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {selectedImage && (
        <div className="modal-image__wrapper">
          <div className="modal-image">
            <div className="modal-image__button-wrapper" onClick={handleClose}>
              <div className="modal-image__button">
              </div>
            </div>
            <img src={selectedImage} alt="Modal" className="modal-image__image" />
          </div>
        </div>
      )}
    </Fragment>
  );
};