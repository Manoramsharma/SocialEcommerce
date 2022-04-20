import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import HomepageCarouselComponent from "../components/homePage/HomepageCaraousel";
import MainContainerNewProducts from "../components/homePage/MainWhatsNew";
import MainContainerCategories from "../components/homePage/MainCategories";
import MainContainerTrendingProducts from "../components/homePage/MainTrending";
import Footer from "../components/footer";
import { Navbar } from "../components/Navbar";
import Card from "../components/cards";
import CategoriesComponent from "../components/homePage/category";
import { width } from "dom-helpers";
import SelectGender from "../components/homePage/SelectGender";
import Homeimg from "../images/Homedecor.svg";
import DealsOfTheDay from "../components/homePage/DealsOfTheDay";
import React, { useState } from "react";

const useStyles = makeStyles({
  marginTop: {
    marginTop: "2%",
  },
  pinkColor: {
    color: "#E53F3F",
  },
  mainDivTop: {
    backgroundColor: "#000000",
  },
  carousel: {
    backgroundColor: "#E53F3F",
  },
  home: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
    position: "absolute",
    top: 0,
    left: 0,
  },
  message: {
    position: "relative",
    backgroundColor: "black",
    boxShadow: "1px 1px 1px grey",
    fontWeight: "800",
    top: 0,

    left: 0,
    marginTop: 64,
    paddingRight: "2rem",
    paddingLeft: "2rem",
    "@media (max-width:660px)": {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
  },
  messagebeta: {
    textAlign: "center",
    width: "100%",
    lineHeight: "25px",
    fontSize: "1rem",
    "@media (max-width:660px)": {
      fontSize: ".8rem",
    },
  },
  cross: {
    height: "16px",
    width: "18px",
    color: "white",
  },
});

//temperory data array `itemsData` do delete incase you find it
let itemData = [
  "https://sc04.alicdn.com/kf/HTB1DcsXLpXXXXcTXpXXq6xXFXXX8.jpg",
  "https://assets.ajio.com/medias/sys_master/root/20210408/HiMy/606e0787f997dd7b64a6eeb5/-473Wx593H-441119753-mediumblue-MODEL.jpg",
  "https://assets.ajio.com/medias/sys_master/root/20201031/UXvA/5f9c609df997dd8c83800bb8/-473Wx593H-441105682-olive-MODEL.jpg",
  "https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOOSMOKY-TRENDYSMOK381955669A9D8/1622965634045_0..jpg",
];

const Home = () => {
  const classes = useStyles();
  const [show, setShow] = useState(true);

  return (
    <div className={classes.home}>
      <div className={classes.message} style={{ display: show ? "block" : "none" }}>
        <div className={classes.messagebeta}>This is beta version of our website</div>
        <button
          onClick={() => setShow((s) => !s)}
          style={{ backgroundColor: "black", border: "none" }}
        >
          <svg className={classes.cross}>
            <polygon
              fill="currentColor"
              points="15.6,1.6 14.4,0.4 8,6.9 1.6,0.4 0.4,1.6 6.9,8 0.4,14.4 1.6,15.6 8,9.1 14.4,15.6 15.6,14.4 9.1,8 "
            ></polygon>
          </svg>
        </button>
      </div>
      <Navbar />
      {/* <CategoriesComponent /> */}

      <HomepageCarouselComponent />
      {/* <MainContainerNewProducts /> */}
      <DealsOfTheDay />
      <SelectGender />
      {/* <MainContainerCategories /> */}
      <div className={classes.homeanddecor}>
        <img src={Homeimg} alt="" style={{ width: "100%", marginTop: "10px", cursor: "pointer" }} />
      </div>
      {/* <MainContainerTrendingProducts /> */}

      <Footer />
    </div>
  );
};

export default Home;
