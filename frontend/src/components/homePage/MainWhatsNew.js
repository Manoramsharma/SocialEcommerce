import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { getProduct } from "../../redux/actions/productAction";
import SliderDisplay from "../SliderDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: "1%",
  },
  typography: {
    marginLeft: "1%",
    fontFamily: "SourceSansPro",
    fontWeight: "bold",
    marginTop: "4%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
}));

const MainContainerNewProducts = () => {
  const { product } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [whatsNew, setWhatsNew] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    try {
      if (product.whatsnew.length === 0) {
        dispatch(getProduct(null));
      }
      setWhatsNew(product.whatsnew);
    } catch (err) {
      /*  console.log(err); */
    }
  }, [product.whatsnew, dispatch]);
  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h5">
        Whats New in the Store!
      </Typography>
      <SliderDisplay carouselImgs={true} data={whatsNew} />
    </div>
  );
};

export default MainContainerNewProducts;
