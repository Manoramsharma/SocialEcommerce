import React from "react";
import { Carousel } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  carouselCont: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#334257",
    overflow: "hidden",
  },
  carouselContHomepage: {
    position: "relative",
    top: 0,
    left: 0,
    // marginTop:64,
    width: "100%",
    height: "fit-content",
    backgroundColor: "#334257",
    overflow: "hidden",
  },
  carousel: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
  },
  carouselItem: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
    },
  },
  carouselItem_M: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    "&:after": {
      display: "block",
      content: '" "',
      width: "100%",
      paddingTop: "100%",
    },
    "& img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
}));

const CarouselComponent = (props) => {
  let propsD = {
    homeCarousel: false,
  };
  Object.assign(propsD, props);

  const classes = useStyles();
  let items = props.items;
  return (
    <div className={propsD.homeCarousel ? classes.carouselContHomepage : classes.carouselCont}>
      <Carousel fade={true} className={classes.carousel} pause="hover">
        {items.map((item) => (
          <Carousel.Item
            className={propsD.homeCarousel ? classes.carouselItem : classes.carouselItem_M}
            interval={2000}
          >
            <img src={item} alt="A product image" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
