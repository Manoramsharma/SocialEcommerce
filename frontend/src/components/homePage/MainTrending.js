import {
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SliderDisplay from "../SliderDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: "1%",
    marginBottom: "2%",
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

let itemData = [
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 1,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 2,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 3,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 4,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 5,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 6,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 7,
  },
  {
    image: "https://res.cloudinary.com/webstore/image/fetch/w_450,c_limit,c_fit,f_auto,e_trim/https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH6d133e21bd094c1ea8db61f0868d029aU%2FLuxury-Male-Pajamas-Solid-Elastic-Royal-Blue-Plus-Size-Sleepwear-V-Neck-Top-Fashion-Home-Clothes.jpg",
    productName: "KalaSaga",
    id: 8,
  },
];

const MainContainerTrendingProducts = () => {
  const classes = useStyles();
  const theme = useTheme();

  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const match1 = useMediaQuery("(max-width : 960px");
  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h5">
        TRENDING
      </Typography>

      <SliderDisplay post={false}  data={itemData}/>

    </div>
  );
};

export default MainContainerTrendingProducts;
