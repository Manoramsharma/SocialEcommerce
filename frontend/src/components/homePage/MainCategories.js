import {
  Typography,
  useTheme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SliderDisplay from "../SliderDisplay";

const useStyles = makeStyles( (theme) => ({
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
    [theme.breakpoints.down("sm")]:
    { 
      fontSize : 20 ,
    },
  },
})
);

let itemData = [
  {
    image: "https://sc04.alicdn.com/kf/HTB1DcsXLpXXXXcTXpXXq6xXFXXX8.jpg",
    productName: "Shirts",
  },
  {
    image: "https://assets.ajio.com/medias/sys_master/root/20210408/HiMy/606e0787f997dd7b64a6eeb5/-473Wx593H-441119753-mediumblue-MODEL.jpg",
    productName: "Jeans",
  },
  {
    image: "https://assets.ajio.com/medias/sys_master/root/20201031/UXvA/5f9c609df997dd8c83800bb8/-473Wx593H-441105682-olive-MODEL.jpg",
    productName: "Bomber Jacket",
  },
  {
    image: "https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOOSMOKY-TRENDYSMOK381955669A9D8/1622965634045_0..jpg",
    productName: "Shoes",
  },
  {
    image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hamilton-lead-1611181753.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*",
    productName: "Watches",
  },
];

const MainContainerCategories = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h5">
        Categories For You
      </Typography>
      <SliderDisplay post={false}  data={itemData}/>
    </div>
  );
};

export default MainContainerCategories;
