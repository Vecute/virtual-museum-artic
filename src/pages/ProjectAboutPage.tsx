import TemplatePage from "./TemplatePage";
import "../styles/projectAbout.scss";
import { useNavigate } from "react-router-dom";

function ProjectAboutPage() {
    // Хук для навигации
    const navigate = useNavigate();

    // Обработчик кнопки "Назад"
    const handleGoBack = () => {
        navigate(-1); // Переход на предыдущую страницу в истории браузера
    };

    return (
        <TemplatePage title="About Project">
            <div className="project__container">
                <p>The site is a virtual museum based on the collection of <a className="project__link-linear" href="https://www.artic.edu/" target="_blank">the Art Institute of Chicago</a></p>
                <ul className="project__list">Main features:
                    <li className="project__list-item">Browse the art collection: explore different categories, periods and styles</li>
                    <li className="project__list-item">Search for specific works: use the search bar to quickly access the objects of interest</li>
                    <li className="project__list-item">Browse random exhibits: discover new works of art using the random selection feature</li>
                    <li className="project__list-item">Find out detailed information about each work: read descriptions, view high-resolution images and study the history of creation</li>
                    <li className="project__list-item">The site provides a user-friendly and intuitive interface for exploring the Art Institute of Chicago's rich collection from the comfort of your home</li>
                </ul>
                <ul className="project__list">Technologies used:
                    <li className="project__list-item">React</li>
                    <li className="project__list-item">Redux Toolkit</li>
                    <li className="project__list-item">Redux Thunk</li>
                    <li className="project__list-item">React Router</li>
                    <li className="project__list-item">TypeScript</li>
                    <li className="project__list-item">HTML, CSS, JavaScript</li>
                    <li className="project__list-item">SCSS</li>
                </ul>
                <p>This site is my graduation project for the <a href="https://teachmeskills.by/" className="project__link-linear" target="_blank">TeachMeSkills</a> school. If you want to know more about me or contact me, use the links to my CV or github page:</p>
                <div className="project__links-container">
                    <a
                        className="project__link"
                        href="https://gleb-khramtsov-cv.netlify.app/"
                        target="_blank"
                    >
                        <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 297" fill="#eeeeee" >
                            <g>
                                <path d="m97.674,94.493c0.059-0.02 5.637-1.733 5.637-1.733 4.007-1.23 8.275,0.894 9.71,4.832l7.635,20.95 7.635-20.951c1.437-3.938 5.712-6.06 9.71-4.831 0,0 5.578,1.713 5.637,1.733 8.314,2.77 14.229,9.913 15.549,18.37v-62.103c0-3.181-2.579-5.76-5.76-5.76h-65.542c-3.181,0-5.76,2.579-5.76,5.76v62.103c1.32-8.457 7.235-15.599 15.549-18.37zm22.982-41.126c10.235,0 18.563,8.327 18.563,18.563 0,10.235-8.327,18.563-18.563,18.563s-18.563-8.327-18.563-18.563c0.001-10.236 8.328-18.563 18.563-18.563z" />
                                <path d="m140.425,110.297l-8.516,23.367h11.81v-17.209c-2.84217e-14-2.52-1.269-4.81-3.294-6.158z" />
                                <path d="m97.594,116.455v17.209h11.81l-8.516-23.367c-2.025,1.348-3.294,3.638-3.294,6.158z" />
                                <path d="m249.375,0h-201.75c-5.799,0-10.5,4.701-10.5,10.5v276c0,5.799 4.701,10.5 10.5,10.5h201.75c5.799,0 10.5-4.701 10.5-10.5v-276c0-5.799-4.701-10.5-10.5-10.5zm-183,37.125c0-4.349 3.526-7.875 7.875-7.875h92.812c4.35,0 7.875,3.526 7.875,7.875v104.414c0,4.349-3.525,7.875-7.875,7.875h-92.812c-4.349,0-7.875-3.526-7.875-7.875v-104.414zm156.375,212.063h-148.5c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h148.5c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875zm0-55.688h-148.5c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h148.5c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875zm0-74.25h-18.563c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h18.563c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875zm0-37.125h-18.563c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h18.563c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875z" />
                            </g>
                        </svg>
                    </a>
                    <a
                        className="project__link"
                        href="https://github.com/vecute"
                        target="_blank"
                    >
                        <svg width="110" height="110" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#eeeeee" >
                            <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" />
                        </svg>

                    </a>
                </div>
            </div>
            <button className="back-button" onClick={handleGoBack}>
                Go back
            </button>
        </TemplatePage>
    );
}

export default ProjectAboutPage;