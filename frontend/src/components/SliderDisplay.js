import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CarouselComponent from "./caraousel";
import { Link } from "react-router-dom";
import Card from "./cards";

//Styles for Slider
const useStyles = makeStyles(theme => ({
  // styles for Slider Container
  sliderContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: 'fit-content',
    "@media (min-width:1800px)": {
      height: 500,
    },
    overflow: "hidden",
  },
  sliderItemContainer: {
    position: "relative",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "fit-content",
    '&::-webkit-scrollbar':{
      display:'none'
    },
    scrollbarWidth: 'none',
    paddingLeft: 52,
    "@media (max-width:500px)": {
      paddingLeft: 35,
    },
    overflowY: "hidden",
    overflowX: "scroll",
    display: "flex",
    flexDirection: "row",
    backgroundColor: props => props.backgroundColor,
    scrollBehavior: "smooth",
  },
  // styles for single item container
  sliderItem: {
    flexBasis: "20%",
    "@media (max-width:1088px)": {
      flexBasis: "30%",
    },
    "@media (max-width:900px)": {
      flexBasis: "35%",
    },
    "@media (max-width:700px)": {
      flexBasis: "40%",
    },
    "@media (max-width:700px)": {
      flexBasis: "50%",
    },
    flexGrow: 0,
    flexShrink: 0,
    position: "relative",
    top: 0,
    left: 0,
    height: "fit-content",
    overflow: "hidden",
    // maxWidth: 220,
    // "@media (min-width:1800px)": {
    //   maxWidth: 320,
    // },
    // minWidth: 150,
    color: "#000000",
    "&:hover":{
      color:'#000000'
    }
  },
  itemContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    width: "95%",
    "@media (min-width:1800px)": {
      maxWidth: 300,
    },
    maxWidth: 200,
    height: "fit-content",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  itemContainerImgCont: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    "&:after": {
      display: "block",
      content: '" "',
      width: "100%",
      paddingTop: "100%",
    },
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  itemContainerImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
  },
  itemContainerDetails: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& h3": {
      fontSize: 17,
    },
    "& p": {
      fontSize: 12,
      marginBottom: 10,
    },
  },

  // styles for previous and next button on the slider
  sliderNextB: {
    position: "absolute",
    top: 0,
    right: 1,
    height: "100%",
    width: 35,
  },
  sliderNextBIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    width: 50,
    height: 50,
    opacity: 1,
    zIndex: 1,
  },
  sliderPreviousB: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 35,
    zIndex:3
  },
  sliderPreviousBIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    width: 50,
    height: 50,
    opacity: 1,
    zINdex: 1,
  },
}));

//scrolls the slider for showing posts behind
function PreviousPosts(slider, scrollAmount, sliderScrollPosition) {
  if (slider && slider.current) {
    if (
      sliderScrollPosition >= 0 &&
      sliderScrollPosition <= slider.current.scrollWidth
    ) {
      sliderScrollPosition = sliderScrollPosition - scrollAmount;
      slider.current.scrollLeft = sliderScrollPosition;
    } else if (sliderScrollPosition < 0) {
      sliderScrollPosition = 0;
      PreviousPosts(slider);
    } else if (sliderScrollPosition > slider.current.scrollWidth) {
      sliderScrollPosition = slider.current.scrollWidth;
      PreviousPosts(slider);
    }
  }
}

// scroll the slider for showing posts ahead
function NextPosts(
  infinitePosts,
  setData,
  postsNumber,
  scrollAmount,
  slider,
  sliderScrollPosition
) {
  // slider.current.scrollLeft = 300;
  if (slider && slider.current) {
    if (
      sliderScrollPosition >= 0 &&
      sliderScrollPosition <= slider.current.scrollWidth
    ) {
      sliderScrollPosition = sliderScrollPosition + scrollAmount;
      slider.current.scrollLeft = sliderScrollPosition;
    } else if (sliderScrollPosition < 0) {
      sliderScrollPosition = 0;
      NextPosts(infinitePosts, slider);
    } else if (sliderScrollPosition > slider.current.scrollWidth) {
      sliderScrollPosition = slider.current.scrollWidth;
      NextPosts(infinitePosts, slider);
    }
    if (infinitePosts) {
      updateData(setData, postsNumber);
    }
  }
}

//update data for infinite scroll effect
function updateData(setData, postsNumber) {
  //send an api call and get the data then
  // update the current data through setData function
  // which which re-render the DOM. Use postNumber to get
  // the data of needed posts
}

const SliderDisplay = props => {
  // assigning default values so we need not specify everthing while
  // using this element
  let propsD = {
    data: [],
    background: "#ffffff",
    post:true,
    infiniteScroll: false,
    carouselImgs: false,
    // the scroll postion so scroll could be updated on button click
    sliderScrollPosition: 0,
  };

  Object.assign(propsD, props);

  let backgroundColor = propsD.background;

  const classes = useStyles({ backgroundColor });
  const theme = useTheme();

  const SliderReference = useRef();
  let sliderValues = SliderReference;

  const [windowWidth, setwindowWidth] = useState(0);
  const [postsNumber, setpostsNumber] = useState(0);
  const [scrollAmount, setscrollAmount] = useState(0);
  const [data, setData] = useState(propsD.data);
  useEffect(() => {
    setData(propsD.data);

    if (SliderReference && SliderReference.current) {
      SliderReference.current.addEventListener("scroll", () => {
        propsD.sliderScrollPosition = SliderReference.current.scrollLeft;
        if (propsD.infiniteScroll) {
          updateData(setData, postsNumber);
        }
      });
      return SliderReference.current.removeEventListener("scroll", () => {
        propsD.sliderScrollPosition = SliderReference.current.scrollLeft;
        if (propsD.infiniteScroll) {
          updateData(setData, postsNumber);
        }
      });
    }
  });
  useLayoutEffect(() => {
    sliderValues = SliderReference;

    function updatingValues() {
      setwindowWidth(window.innerWidth);
      if (windowWidth > 2000) {
        setpostsNumber(5);
        setscrollAmount(900);
      } else if (windowWidth > 1088 && windowWidth < 2000) {
        setpostsNumber(4);
        setscrollAmount(800);
      } else if (windowWidth > 850 && windowWidth < 1088) {
        setpostsNumber(3);
        setscrollAmount(600);
      } else if (windowWidth > 600 && windowWidth < 850) {
        setpostsNumber(3);
        setscrollAmount(400);
      } else if (windowWidth > 0 && windowWidth < 850) {
        setpostsNumber(3);
        setscrollAmount(200);
      }
    }
    updatingValues();
    window.addEventListener("resize", () => {
      updatingValues();
    });
    return window.removeEventListener("resize", () => {
      updatingValues();
    });
  });
  return (
    <div className={classes.sliderContainer}>
      <div ref={SliderReference} className={classes.sliderItemContainer}>
        {data.map(ele => (
          <div
            style={{ textDecoration: "none" }}
            className={classes.sliderItem}
          >
            <Card to={ele._id ? "/buyproduct/" + ele._id : "/"} data={ele} carouselImgs={{display:propsD.carouselImgs,arrows:true,dots:true,swipe:false,autoSlide:false,}} post={propsD.post} />
            {/* <div className={classes.sliderItem}>
              <div className={classes.itemContainer}>
                <div className={classes.itemContainerImgCont}>
                  {propsD.carouselImgs ? (
                    <CarouselComponent items={ele.images} />
                  ) : (
                    <img
                      className={classes.itemContainerImg}
                      src={ele.image}
                      alt="A Product Image"
                    />
                  )}
                </div>

                <div className={classes.itemContainerDetails}>
                  <h3 style={{width:'100%'}}>{ele.productName}</h3>
                  {propsD.price ? <p>Price : {ele.price}</p> : ''}
                  {propsD.likes.length ? <p> likes :{ele.likes.length}</p> : <p> likes : 0</p>}
                  {propsD.comments ? <p>Comments : {ele.comments}</p> : ''}
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>
      <div
        onClick={() =>
          PreviousPosts(sliderValues, scrollAmount, propsD.sliderScrollPosition)
        }
        class={classes.sliderPreviousB}
      >
        <NavigateBeforeIcon className={classes.sliderPreviousBIcon} />
      </div>
      <div
        onClick={() =>
          NextPosts(
            propsD.infiniteScroll,
            setData,
            postsNumber,
            scrollAmount,
            sliderValues,
            propsD.sliderScrollPosition
          )
        }
        className={classes.sliderNextB}
      >
        <NavigateNextIcon className={classes.sliderNextBIcon} />
      </div>
    </div>
  );
};

export default SliderDisplay;
