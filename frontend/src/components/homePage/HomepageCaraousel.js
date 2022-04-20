import { useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import CarouselComponent from "../caraousel";

function CarouselComponents() {
  const theme = useTheme();
  let match = useMediaQuery(theme.breakpoints.down(500));
  //aspect ratio for pc's and computers should be 80:21
  let items = ["carousel_1.svg", "carousel_2.svg"];

  //aspect ratio for mobiles should be 90:79
  let items_M = ["carousel_1_M.jpg", "carousel_2_M.jpg"];
  return match ? items_M : items;
}

const HomepageCarouselComponent = () => {
  return <CarouselComponent homeCarousel={true} items={CarouselComponents()} />;
};

export default HomepageCarouselComponent;
