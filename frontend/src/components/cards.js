import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart } from "../redux/actions/profileAction";

import { Typography, useTheme, useMediaQuery } from "@material-ui/core";
//icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SendIcon from "@material-ui/icons/Send";
import CustomCarousel from "./CustomCarousel";
import { IoMdStar } from "react-icons/io";
import LikeButton from "./LikeButton";

const useStyles = makeStyles((theme) => ({
  // styles for card  goes here

  root: {
    position: "relative",
    marginTop: "4%",
    // top: "50%",
    // left: "50%",
    // transform: "translateX(-50%) translateY(-50%)",
    width: "95%",
    "@media (max-width:700px)": {
      width: "100%",
    },
    backgroundColor: "#ffffff",
    // WebkitMaskImage: '-webkit-radial-gradient(white, black)',
    // "@media (min-width:1800px)": {
    //   maxWidth: 300,
    // },
    // maxWidth: 200,
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // backgroundColor: "#F08080",
    overflow: "hidden",
    "&:hover": {
      boxShadow: "3px 3px 19px -10px rgba(0,0,0,0.75)",
    },
    boxShadow: "0px 1px 8px -5px rgb(0 0 0 / 75%)",
    border: "0.23px solid #e1e1e1ad",
    "@media (max-width:420px)": {
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
    },
  },
  cardContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    padding: "5%",
    overflow: "hidden",
  },
  btnContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    "& a": {
      position: "relative",
      top: 0,
      left: 0,
      width: "50%",
      height: "fit-content",
    },
    "& button": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "fit-content",
      padding: "3%",
      alignItems: "center",
      border: "0.8px solid #e1e1e1ad",
      borderBottom: 0,
      fontSize: "0.6rem",
      color: "#d68989",
      whiteSpace: "nowrap",
      backgroundColor: "#ffffff",
      borderLeft: "none",
      borderBottom: "none",
    },
  },
  imgContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    zIndex: "1",
    backgroundColor: "#FFFFFF",
  },
  singleImg: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    "&:before": {
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
  productInfo: {
    position: "relative",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "fit-content",
  },
  textInfoContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "60%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
  },

  productName: {
    display: "block",
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    maxHeight: "100%",
    "& p": {
      width: "100%",
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      fontSize: "0.7rem",
      margin: 0,
    },
  },
  priceContainer: {
    position: "relative",
    top: 0,
    left: 0,
    marginTop: "7%",
    marginLeft: "3%",
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    "& p": {
      margin: 0,
      marginRight: "4px",
      padding: 0,
      width: "fit-content",
      whiteSpace: "nowrap",
    },
  },
  discountedPrice: {
    position: "relative",
    top: 0,
    left: 0,
    height: "fit-content",
    fontSize: "0.8rem",
  },
  originalPrice: {
    position: "relative",
    top: 0,
    left: 0,
    height: "fit-content",
    fontSize: "0.55rem",
    textDecoration: "line-through",
  },
  discount: {
    position: "relative",
    top: 0,
    left: 0,
    height: "fit-content",
    fontSize: "0.55rem",
    color: "#00f800",
  },
  iconInfoContainer: {
    position: "relative",
    top: 0,
    left: 0,
    // transform:'translateY(-50%)',
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    "& svg": {
      fontSize: "1.3rem",
    },
  },
  likesInfo: {
    position: "relative",
    top: 0,
    left: 0,
    width: "fit-content",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    fontSize: "1.2rem",
    zIndex: "3",
    "& p": {
      display: "flex",
      justifyContent: "center",
      fontSize: "0.4rem",
      margin: 0,
    },
    cursor: "pointer",
  },
  userInfoSize: {
    position: "relative",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "fit-content",
  },
  sizesName: {
    display: "flex",
    position: "relative",
    top: 0,
    left: 0,
    width: "50%",
    height: "fit-content",
    flexDirection: "column",
    marginTop: "2%",
    "& p": {
      width: "100%",
      maxWidth: "100%",
      whiteSpace: "nowrap",
      fontSize: "0.9rem",
      margin: 0,
    },
  },
  sizesContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    "& p": {
      fontSize: "0.3rem",
      borderRadius: "16%",
      backgroundColor: "#f7f6f6",
      position: "relative",
      top: 0,
      left: 0,
      width: "20%",
      color: "#393939",
      transition: "background-color .3s ease-in-out",
      "&:hover": {
        backgroundColor: "#192a56 !important",
        color: "#ffffff !important",
      },
      "&:after": {
        display: "block",
        content: '" "',
        width: "100%",
        paddingTop: "100%",
      },
      "& a": {
        pointerEvents: "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      },
    },
  },
  userData: {
    position: "relative",
    top: 0,
    left: 0,
    width: "50%",
    height: "fit-content",
    marginTop: "4%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      width: "30%",
      borderRadius: "50%",
      "& :after": {
        display: "block",
        content: '" "',
        width: "100%",
        paddingTop: "100%",
      },
    },
    "& p": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "fit-content",
      margin: 0,
      marginLeft: "1px",
      fontSize: "0.6rem",
      textAlign: "center",
      whiteSpace: "nowrap",
    },
  },
  userRatingName: {
    position: "relative",
    top: 0,
    left: 0,
    width: "70%",
    height: "fit-content",
    marginTop: "4%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingsContainer: {
    position: "relative",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "fit-content",
    justifyContent: "space-around",
  },

  infoBlock: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: 50,
    zIndex: "4",
  },
  // infoContainer:{
  //   backgroundColor:'#ffffff',
  //   width:'100%',
  //   height:'fit-content',
  //   position:'relative',
  //   top:(propsD) => ((propsD.hover && !propsD.match) ? '-110px' : '0px'),
  //   left:0,
  //   transition:'all 0.5s ease-in',
  //   display:'flex',
  //   flexDirection:'column',
  //   alignItems:'center'
  // },
  shownInfo: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "fit-content",
    position: "relative",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
  },

  MainIconsContainer: {
    position: "relative",
    top: 0,
    left: 0,
    // transform:'translateY(-50%)',
    width: (propsD) => (propsD.match ? "20%" : "40%"),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: "2%",
  },

  cartBtn: {
    position: "relative",
    top: 0,
    left: 0,
    width: "80%",
    marginTop: "4%",
    height: "fit-content",
    fontSize: "1rem",
    border: 0,
    borderRadius: "10px",
    display: "block",
    backgroundColor: "#192a56",
    color: "#ffffff",
    "&:hover": {
      boxShadow: "0 5px 10px rgba(0,0,0,.3)",
      transform: "translateY(-2px)",
    },
  },
  categoryName: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    maxHeight: "20px",
    "& p": {
      width: "100%",
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      fontSize: "1.2rem",
    },
  },
}));

const Card = (props) => {
  const { auth } = useSelector((state) => state);

  var propsD = {
    data: {},
    post: true,
    carouselImgs: {},
    avatar: "",
    username: "",
    to: "",
  };

  Object.assign(propsD, props);

  var id = propsD.to.split("/")[2];

  const dispatch = useDispatch();
  const history = useHistory();

  const [size, setSize] = useState("s");
  const [quantity, setQuantity] = useState(1);
  const [hover, setHover] = useState(false);
  const [focus, setfocus] = useState(true);

  const rootReference = useRef();
  // useEffect( () => {
  //   if(rootReference && rootReference.current){
  //     rootReference.current.addEventListener("mouseover", () => {
  //       setHover(true);
  //     });
  //     return rootReference.current.removeEventListener("mouseover", () => {
  //       setHover(true);
  //     });
  //   }
  // });
  // useEffect( () => {
  //   if(rootReference && rootReference.current){
  //     rootReference.current.addEventListener("mouseleave", () => {
  //       setHover(false);
  //     });
  //     return rootReference.current.removeEventListener("mouseleave", () => {
  //       setHover(false);
  //     });
  //   }
  // });

  const theme = useTheme();
  var match = useMediaQuery("(max-width : 769px");
  const classes = useStyles({ match: match });

  const handleSizeChange = (e) => {
    setfocus(false);

    e.target.offsetParent.childNodes.forEach((ele) => {
      ele.style.backgroundColor = "#f7f6f6";
      ele.style.color = "#393939";
    });
    e.target.style.backgroundColor = "#192a56";
    e.target.style.color = "#ffffff";
    setSize(e.target.childNodes[0].textContent);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ size, id, quantity, auth }));
    history.push("/cart");
  };

  return (
    <div ref={rootReference} className={classes.root}>
      <div className={classes.cardContainer}>
        <div className={classes.imgContainer}>
          {propsD.carouselImgs.display ? (
            <CustomCarousel
              arrows={propsD.carouselImgs.arrows}
              dots={propsD.carouselImgs.dots}
              autoSlide={propsD.carouselImgs.autoSlide}
              swipe={propsD.carouselImgs.swipe}
              to={propsD.to}
              items={propsD.data.images}
            />
          ) : (
            <a href={propsD.to}>
              <div className={classes.singleImg}>
                <img src={propsD.data.image} alt="A Product Image" />
              </div>
            </a>
          )}
        </div>

        <div className={classes.productInfo}>
          <div className={classes.textInfoContainer}>
            <div className={classes.productName}>
              <p>{propsD.data.productName}</p>
            </div>
            {propsD.post ? (
              <div className={classes.priceContainer}>
                <p className={classes.discountedPrice}>{propsD.data.price}</p>
                <p className={classes.originalPrice}>{propsD.data.mrp}</p>
                <p className={classes.discount}>
                  ({Math.floor(((propsD.data.mrp - propsD.data.price) / propsD.data.mrp) * 100)} %
                  off)
                </p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {propsD.post ? (
            <div className={classes.iconInfoContainer}>
              <BookmarkBorderIcon style={{ color: "rgb(68, 68, 68)" }} />
              <LikeButton
                likesData={propsD.data.likes}
                auth={auth}
                id={id}
                style={{ color: "rgb(68, 68, 68)" }}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {props.post ? (
          <div className={classes.userInfoSize}>
            <div className={classes.sizesName}>
              {/* <p>Sizes:</p> */}
              <div className={classes.sizesContainer}>
                <p
                  style={
                    focus
                      ? { backgroundColor: "#192a56", color: "#ffffff" }
                      : { backgroundColor: "#f7f6f6", color: "#393939" }
                  }
                  onClick={handleSizeChange}
                >
                  <a>XS</a>
                </p>
                <p onClick={handleSizeChange}>
                  <a>S</a>
                </p>
                <p onClick={handleSizeChange}>
                  <a>M</a>
                </p>
                <p onClick={handleSizeChange}>
                  <a>L</a>
                </p>
              </div>
            </div>
            {/* <div className={classes.userData}>
          {console.log(propsD.data)}
            <img src={propsD.data.user.avatar ? propsD.data.user.avatar : propsD.avatar} />
            <div className={classes.userRatingName}>
              <p>{propsD.data.user.fullname ? propsD.data.user.fullname : propsD.username}</p>
              <div className={classes.ratingsContainer}>
                <IoMdStar
                  size={12}
                  color={'#FFBA5A'
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
                <IoMdStar
                  size={12}
                  color={'#FFBA5A'
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
                <IoMdStar
                  size={12}
                  color={'#FFBA5A'
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
                <IoMdStar
                  size={12}
                  color={'#FFBA5A'
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
                <IoMdStar
                  size={12}
                  color={'#a9a9a9'
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            
          </div> */}
          </div>
        ) : (
          <div></div>
        )}
        {/* <div className={classes.infoBlock}>
          {propsD.post ? 
            <div className={classes.infoContainer}>
              <div className={classes.shownInfo}>
                <div className={classes.textInfoContainer}>
                  <div className={classes.productName}>
                    <p>{propsD.data.productName}</p>
                  </div>
                  {match ? <div></div> :
                    <div className={classes.sizesName}>
                      <p>Sizes:</p>
                      <div className={classes.sizesContainer}>
                        <p><a>XS</a></p>
                        <p><a>S</a></p>
                        <p><a>M</a></p>
                        <p><a>L</a></p>
                      </div>
                    </div>
                  }
                  <div className={classes.priceContainer}>
                    <p className={classes.discountedPrice}>{propsD.data.price}</p>
                    <p className={classes.originalPrice}>{propsD.data.mrp}</p>
                    <p className={classes.discount}>({Math.floor(((propsD.data.mrp - propsD.data.price)/propsD.data.mrp)*100)} % off)</p>
                  </div>
                  {match ? <div></div> :
                    <div className={classes.userData}>
                      <img src={propsD.data.user.avatar} />
                      <p>{propsD.data.user.fullname}</p>
                    </div>
                  }
                </div>
                <div className={classes.MainIconsContainer}>
                  {match ? 
                  <div className={classes.iconInfoContainer}>
                    <div className={classes.likesInfo}>
                      <FavoriteBorderIcon />
                      <p>{propsD.data.likes.length}</p>
                    </div>              
                  </div> 
                  : 
                  <div className={classes.iconInfoContainer}>
                    <SendIcon  />
                    <BookmarkBorderIcon />
                    <div className={classes.likesInfo}>
                      <FavoriteBorderIcon />
                      <p>{propsD.data.likes.length}</p>
                    </div>              
                  </div>
                  }
                  
                </div>
              </div>
              
              <button className={classes.cartBtn}>Add To Cart</button>  
            </div> 
          :
            <div className={classes.categoryName}>
              <p>{propsD.data.productName}</p>
            </div>}
          
        </div> */}
      </div>
      {props.post ? (
        <div className={classes.btnContainer}>
          <a href={propsD.to} style={{ textDecoration: "none" }}>
            <button>BUY NOW</button>
          </a>
          <a style={{ textDecoration: "none" }}>
            <button onClick={handleAddToCart} style={{ borderRight: "none" }}>
              ADD TO CART
            </button>
          </a>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Card;
