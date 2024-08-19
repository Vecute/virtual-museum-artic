import { useLocation, useNavigate } from "react-router-dom";
import "../styles/footer.scss";

const Footer = () => {
  const location = useLocation()
      // Хук для навигации
      const navigate = useNavigate();
  
  return (
    <footer className={`footer ${location.pathname === ("/home") ? "footer__home" : ""}`}>
      <div className="main-container footer__container">
        <p>2024</p>
        <p className="footer__info" onClick={() => {
            navigate("/project-about");
          }}>Project info</p>
      </div>
    </footer>
  );
};

export default Footer;
