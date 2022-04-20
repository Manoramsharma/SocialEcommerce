import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
  },
  carouselImageContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    "&:after": {
      content: '" "',
      display: "block",
      width: "100%",
      paddingTop: "100%",
    },
    overflow: "hidden",
    "& a": {
      zIndex: "1",
    },
  },
  imagesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "visible",
    transition: "transform 0.30s ease-in-out",
    transform: (props) => `translateX(-${props.translate.toString()}%)`,
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      flexBasis: "100%",
    },
  },
  nextIcon: {
    position: "absolute",
    top: "50%",
    right: 1,
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#e0dfdf",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2",
    cursor: "pointer",
  },
  beforeIcon: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#e0dfdf",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2",
    cursor: "pointer",
  },
  dotsContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  dotsImg_0: {
    display: (props) => (props.length > 0 ? "block" : "none"),
    position: "relative",
    top: 0,
    left: 0,
    margin: "4%",
    height: "10px",
    width: "10px",
    color: "#ffffff",
    fontSize: "0.5rem",
    border: "1px solid black",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: (props) => (props.postNum == 0 ? "#000000" : "#ffffff"),
  },
  dotsImg_1: {
    display: (props) => (props.length > 1 ? "block" : "none"),
    position: "relative",
    top: 0,
    left: 0,
    margin: "4%",
    height: "10px",
    width: "10px",
    color: "#ffffff",
    fontSize: "0.5rem",
    border: "1px solid black",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: (props) => (props.postNum == 1 ? "#000000" : "#ffffff"),
  },
  dotsImg_2: {
    display: (props) => (props.length > 2 ? "block" : "none"),
    position: "relative",
    top: 0,
    left: 0,
    margin: "4%",
    height: "10px",
    width: "10px",
    color: "#ffffff",
    fontSize: "0.5rem",
    border: "1px solid black",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: (props) => (props.postNum == 2 ? "#000000" : "#ffffff"),
  },
  dotsImg_3: {
    display: (props) => (props.length > 3 ? "block" : "none"),
    position: "relative",
    top: 0,
    left: 0,
    margin: "4%",
    height: "10px",
    width: "10px",
    color: "#ffffff",
    fontSize: "0.5rem",
    border: "1px solid black",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: (props) => (props.postNum == 3 ? "#000000" : "#ffffff"),
  },
}));

const CustomCarousel = (props) => {
  let propsD = {
    homeCarousel: false,
    items: [],
    to: "",
    autoSlide: false,
    arrows: true,
    dots: true,
    swipe: true,
  };
  Object.assign(propsD, props);

  const [translate, setTranslate] = useState(0);
  const [postNum, setPostNum] = useState(0);
  const [hover, setHover] = useState(false);

  const rootReference = useRef();

  //checking for a swipe and swiping images
  useEffect(() => {
    if (rootReference && rootReference.current && propsD.swipe) {
      rootReference.current.addEventListener(
        "touchstart",
        function (event) {
          handleTouchStart(event);
        },
        false
      );
      return rootReference.current.removeEventListener(
        "touchstart",
        function (event) {
          handleTouchStart(event);
        },
        false
      );
    }
  });
  useEffect(() => {
    if (rootReference && rootReference.current && propsD.swipe) {
      rootReference.current.addEventListener(
        "touchmove",
        function (event) {
          handleTouchMove(event, rootReference.current);
        },
        false
      );
      return rootReference.current.removeEventListener(
        "touchmove",
        function (event) {
          handleTouchMove(event, rootReference.current);
        },
        false
      );
    }
  });
  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt, element) {
    if (!xDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        //next
        if (translate >= 0 && translate < items.length * 100 - 100) {
          setTranslate(translate + 100);
          setPostNum(Math.floor((translate + 100) / 100));
        }
      } else {
        //previous
        if (translate >= 100 && translate <= items.length * 100) {
          setTranslate(translate - 100);
          setPostNum(Math.floor((translate - 100) / 100));
        }
      }
    } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
      evt.preventDefault();
    }

    /* reset values */
    xDown = null;
    yDown = null;
  }

  // checking for hover on images
  useEffect(() => {
    if (rootReference && rootReference.current && propsD.autoSlide) {
      rootReference.current.addEventListener("mouseover", () => {
        setHover(true);
      });
      return rootReference.current.removeEventListener("mouseover", () => {
        setHover(true);
      });
    }
  });
  useEffect(() => {
    if (rootReference && rootReference.current && propsD.autoSlide) {
      rootReference.current.addEventListener("mouseleave", () => {
        setHover(false);
      });
      return rootReference.current.removeEventListener("mouseleave", () => {
        setHover(false);
      });
    }
  });
  let items = props.items;

  const classes = useStyles({ translate, postNum, length: items.length });
  const handleArrowClick = (name) => {
    if (name == "prev") {
      if (translate >= 100 && translate <= items.length * 100) {
        setTranslate(translate - 100);
        setPostNum(Math.floor((translate - 100) / 100));
      }
    } else if (name == "next") {
      if (translate >= 0 && translate < items.length * 100 - 100) {
        setTranslate(translate + 100);
        setPostNum(Math.floor((translate + 100) / 100));
      }
    }
  };
  const handleDotClick = (num) => {
    setPostNum(num);
    setTranslate(num * 100);
  };

  useEffect(() => {
    let i = translate;
    if (propsD.autoSlide) {
      const timer = setTimeout(() => {
        if (!hover) {
          if (translate < (items.length - 1) * 100) {
            setTranslate(translate + 100);
            setPostNum(Math.floor((translate + 100) / 100));
          } else {
            setTranslate(0);
            setPostNum(0);
          }
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  });
  return (
    <div ref={rootReference} className={classes.carouselContainer}>
      <div className={classes.carouselImageContainer}>
        <a href={propsD.to}>
          <div className={classes.imagesContainer}>
            {items.map((item) => (
              <img src={item} alt="Product Image" />
            ))}
          </div>
        </a>
        {propsD.arrows ? (
          <div
            onClick={() => {
              handleArrowClick("next");
            }}
            className={classes.nextIcon}
          >
            <NavigateNextIcon />
          </div>
        ) : (
          <div></div>
        )}
        {propsD.arrows ? (
          <div
            onClick={() => {
              handleArrowClick("prev");
            }}
            className={classes.beforeIcon}
          >
            <NavigateBeforeIcon />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {propsD.dots ? (
        <div className={classes.dotsContainer}>
          <div
            onClick={() => {
              handleDotClick(0);
            }}
            className={`${classes.dotsImg_0}`}
          />
          <div
            onClick={() => {
              handleDotClick(1);
            }}
            className={`${classes.dotsImg_1}`}
          />
          <div
            onClick={() => {
              handleDotClick(2);
            }}
            className={`${classes.dotsImg_2}`}
          />
          <div
            onClick={() => {
              handleDotClick(3);
            }}
            className={`${classes.dotsImg_3}`}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CustomCarousel;
