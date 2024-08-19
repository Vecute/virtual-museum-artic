import TemplatePage from "./TemplatePage";
import "../styles/about.scss";
import RandomExhibit from "../components/RandomExhibit";

function RandomExhibitPage() {

  return (
    <TemplatePage title="Random collection item">
      <RandomExhibit></RandomExhibit>
    </TemplatePage>
  );
}

export default RandomExhibitPage;
