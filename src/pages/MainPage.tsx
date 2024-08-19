import "../styles/mainPage.scss";
import { useRef, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

// Компонент главной страницы
const MainPage = () => {
  // Создание рефа для доступа к видеоэлементу
  const videoRef = useRef<HTMLVideoElement>(null);
  // Состояние для отслеживания воспроизведения видео
  const [isPlaying, setIsPlaying] = useState(true);

  // Хук useNavigate для навигации
  const navigate = useNavigate();

  // Функция для переключения воспроизведения/паузы видео
  const togglePlay = () => {
    // Проверяем, доступен ли видеоэлемент
    if (videoRef.current) {
      if (isPlaying) {
        // Если видео воспроизводится, ставим на паузу
        videoRef.current.pause();
      } else {
        // Если видео на паузе, запускаем воспроизведение
        videoRef.current.play();
      }
      // Инвертируем состояние воспроизведения
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Header />
      <div className="video-container">
        <div className="main__info">
          <h1 className="main__title">
            Welcome to the Art Institute of Chicago, home to a collection of art
            that spans centuries and the globe
          </h1>
          <button
            className="main__button"
            onClick={() => {
              navigate("/search");
            }}
          >
            Explore the collection
          </button>
        </div>
        <video
          ref={videoRef}
          src="/video/HomepageVideo.mp4"
          autoPlay
          muted
          loop
          className="video"
          playsInline // Воспроизведение видео внутри страницы (для мобильных устройств)
          poster="/images/video-preview.jpg" // Постер, отображаемый до начала воспроизведения
        />
        <button className="play-pause-button" onClick={togglePlay}>
          {isPlaying ? (
            // Иконка "Пауза"
            <svg height="35px" width="35px" version="1.1" viewBox="0 0 512 512">
              <path
                d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
         c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
         c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"
              />
            </svg>
          ) : (
            // Иконка "Воспроизведение"
            <svg height="35px" width="35px" version="1.1" viewBox="0 0 512 512">
              <path
                d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M344.48,269.57l-128,80
          c-2.59,1.617-5.535,2.43-8.48,2.43c-2.668,0-5.34-0.664-7.758-2.008C195.156,347.172,192,341.82,192,336V176
          c0-5.82,3.156-11.172,8.242-13.992c5.086-2.836,11.305-2.664,16.238,0.422l128,80c4.676,2.93,7.52,8.055,7.52,13.57
          S349.156,266.641,344.48,269.57z"
              />
            </svg>
          )}
        </button>
        <footer className="footer footer__main">
          <div className="main-container footer__container">
            <p>2024</p>
            <p className="footer__info" onClick={() => {
              navigate("/project-about");
            }}>Project info</p>
            <p className="footer__text footer__info">All rights reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainPage;