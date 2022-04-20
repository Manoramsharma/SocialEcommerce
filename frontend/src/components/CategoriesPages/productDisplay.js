// Infinte scroll code in these comments -----------------------------

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { Card, CardActionArea, CardContent } from "@material-ui/core";
// import { Carousel } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import {
//   Button,
//   Divider,
//   Drawer,
//   FormControlLabel,
//   List,
//   makeStyles,
//   Radio,
//   RadioGroup,
//   Typography,
// } from "@material-ui/core";
// import WcIcon from "@material-ui/icons/Wc";
// import GradeIcon from "@material-ui/icons/Grade";
// import LocalMallIcon from "@material-ui/icons/LocalMall";
// import RotateLeftIcon from "@material-ui/icons/RotateLeft";
// import { getAllProducts } from "../../redux/actions/productAction";
// import {
//   useInfiniteQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from "react-query";
// import { getDataAPI } from "../../utils/fetchData";
// const drawerWidth = 240;
// const useStyles = makeStyles({
//   filterHeading: {
//     marginTop: 75,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     padding: "1%",
//     backgroundColor: "#F4F9F9",
//   },
//   margin: {
//     marginTop: 50,
//   },
//   container: {
//     display: "flex",
//     height: "fit-content",
//     marginTop: 40,
//     justifyContent: "space-evenly",
//     width: 140,
//   },
//   drawerHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   starIcon: {
//     color: "#FFD523",
//   },
//   ProductIcon: {
//     color: "#FB9300",
//   },
//   gendersIcon: {
//     color: "#005A8D",
//   },
//   media: {
//     height: 300,
//     width: 300,
//   },
//   cardContainer: {
//     width: "100%",
//     padding: "3%",
//   },
//   mainContainer: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr 1fr",
//     gap: "20px 10px",
//     marginLeft: 300,
//     marginBottom: "5%",
//     marginTop: 90,
//   },
//   strikeThrough: {
//     textDecorationLine: "line-through",
//   },
// });

// const ProductDisplayComponent = () => {
//   const fetchInfiniteProducts = async ({ pageParam = 1 }) => {
//     console.log("in fetchInfiniteProducts");
//     try {
//       const res = getDataAPI(`/allproducts?page=${pageParam}&limit=9`);

//       return res;
//     } catch (error) {
//       console.group(error);
//     }
//   };
//   const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
//     useInfiniteQuery("products", fetchInfiniteProducts, {
//       getNextPageParam: (lastPage, pages) => {
//         if (lastPage.data.next) return lastPage.data.next.page;
//         return false;
//       },
//     });
//   if (isLoading) return <p>Loading ...</p>;
//   return (
//     <div>
//       {data && (
//         <>
//           {data.pages.map(item =>
//             item.data.results.map(values => <img src={values.images[0]} />)
//           )}
//           {isFetching && <p>Loading ...</p>}
//           {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
//         </>
//       )}
//     </div>
//   );
// };

// infinite scroll code ends here -----------------------------------------------------------------

//category page
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../cards";
import {
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import WcIcon from "@material-ui/icons/Wc";
import GradeIcon from "@material-ui/icons/Grade";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getAllProducts } from "../../redux/actions/productAction";
import { NoEncryption } from "@material-ui/icons";
const drawerWidth = 240;
const useStyles = makeStyles({
  filterHeading: {
    marginTop: 128,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,

    "@media (max-width:500px)": {
      width: 160,
    },
    "@media (max-width:610px)": {
      transform: (props) => (props.displayfilter ? "translateX(0%)" : "translateX(-100%)"),
    },
    padding: "1%",
    backgroundColor: "#F4F9F9",
    transition: "transform 0.5s ease-out",
    zIndex: 4,
  },
  margin: {
    marginTop: 128,
  },
  container: {
    display: "flex",
    height: "fit-content",
    marginTop: 40,
    justifyContent: "space-evenly",
    width: 140,
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  starIcon: {
    color: "#FFD523",
  },
  ProductIcon: {
    color: "#FB9300",
  },
  gendersIcon: {
    color: "#005A8D",
  },
  media: {
    height: 300,
    width: 300,
  },
  cardContainer: {
    width: "100%",
    padding: "3%",
  },
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    "@media (max-width:1080px)": {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    "@media (max-width:760px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "@media (max-width:380px)": {
      gridTemplateColumns: "1fr",
    },
    "@media (max-width:610px)": {
      marginLeft: 0,
    },
    gap: "20px 10px",
    marginLeft: 300,
    marginBottom: "5%",
    marginTop: 64,
    "@media (max-width:660px)": {
      marginTop: 128,
    },
  },
  strikeThrough: {
    textDecorationLine: "line-through",
  },
  filterBtn: {
    position: "fixed",
    top: "98%",
    left: "98%",
    transform: "translateX(-100%) translateY(-100%)",
    width: 120,
    padding: "1%",
    border: "none",
    borderRadius: 15,
    backgroundColor: "#cecece",
    zIndex: 3,
    fontSize: "1rem",
    display: "none",
    "@media (max-width:610px)": {
      display: "block",
    },
  },

  filterCBtn: {
    position: "relative",
    left: "95%",
    transform: "translateX(-100%)",
    marginBottom: "4%",
    fontSize: "1.5rem",
  },
});

const ProductDisplayComponent = (props) => {
  const { product } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [productArray, setProductArray] = useState([]);
  const [Gendervalue, setGenderValue] = React.useState("");
  const [RatingValue, setRatingValue] = React.useState("");
  const [ProductValue, setProductsValue] = React.useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [products, setProducts] = React.useState([]);
  const [displayfilter, setDisplayFilter] = useState(false);
  const classes = useStyles({ displayfilter });
  const handleReset = () => {
    setGenderValue("");
    setRatingValue("");
    setProductsValue("");
  };

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);
    const temp = product.allproducts.filter((x) => x.category === event.target.value);
    setProductArray(temp);
  };
  const handleCategoryChange = (event) => {
    setSubCategory(event.target.value);
    const temp = product.allproducts.filter((x) => x.subCategory === event.target.value);
    setProductArray(temp);
  };
  const handleProductChange = (event) => {
    setProductsValue(event.target.value);
  };
  const handleFilter = () => {
    displayfilter ? setDisplayFilter(false) : setDisplayFilter(true);
  };
  const handleCloseFilter = () => {
    displayfilter ? setDisplayFilter(false) : setDisplayFilter(true);
  };
  useEffect(() => {
    try {
      if (product.allproducts.length === 0) {
        dispatch(getAllProducts(null));
      }
      setProductArray(product.allproducts);
      if (product.allproducts) {
        if (category) {
          const temp = product.allproducts.filter((x) => x.category === category);
          setProductArray(temp);
          setGenderValue(category);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [product.allproducts, dispatch]);

  useEffect(() => {
    if (props.category) {
      const temp = product.allproducts.filter((x) => x.category === props.category);
      setProductArray(temp);
    }
  }, []);
  return (
    <div>
      <div>
        <Drawer
          variant="permanent"
          anchor="left"
          style={{ zIndex: 1 }}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List className={classes.filterHeading}>
            <AiOutlineCloseCircle
              className={classes.filterCBtn}
              onClick={() => {
                handleCloseFilter();
              }}
            />

            <div className={classes.drawerHeader}>
              <Typography variant="h6">Filter</Typography>
              <Button
                startIcon={<RotateLeftIcon />}
                variant="contained"
                disableElevation
                size="small"
                color="primary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
            <Divider />
            <div className={classes.container}>
              <WcIcon className={classes.gendersIcon} />
              <Typography>Gender -</Typography>
            </div>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={Gendervalue}
              onChange={handleGenderChange}
            >
              <FormControlLabel
                value="Men"
                control={<Radio />}
                label="Men"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Women"
                control={<Radio />}
                label="Women"
                labelPlacement="start"
              />

              <FormControlLabel
                value="Accessories"
                control={<Radio />}
                label="Accessories"
                labelPlacement="start"
              />
            </RadioGroup>
            <div className={classes.container}>
              <GradeIcon className={classes.starIcon} />
              <Typography>SubCategory -</Typography>
            </div>
            <RadioGroup
              aria-label="rating"
              name="rating"
              value={SubCategory}
              onChange={handleCategoryChange}
            >
              <FormControlLabel
                value="Shirt"
                control={<Radio />}
                label="Shirt"
                labelPlacement="start"
              />
              <FormControlLabel
                value="T-shirt"
                control={<Radio />}
                label="T-shirt"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Jeans"
                control={<Radio />}
                label="Jeans"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Watch"
                control={<Radio />}
                label="Watch"
                labelPlacement="Watch"
              />
            </RadioGroup>
            <div className={classes.container}>
              <LocalMallIcon className={classes.ProductIcon} />
              <Typography>Products -</Typography>
            </div>
            <RadioGroup
              aria-label="products"
              name="products"
              value={ProductValue}
              onChange={handleProductChange}
            >
              <FormControlLabel
                value="Shoes"
                control={<Radio />}
                label="Shoes"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Watches"
                control={<Radio />}
                label="Watches"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Shirt"
                control={<Radio />}
                label="Shirt"
                labelPlacement="start"
              />
            </RadioGroup>
          </List>
        </Drawer>
      </div>

      <div className={classes.mainContainer}>
        {productArray.map((item, i) => (
          <Card
            to={"/buyproduct/" + item._id + "/"}
            username={item.user.username}
            avatar={item.user.avatar}
            data={item}
            carouselImgs={{
              display: true,
              arrows: false,
              dots: true,
              swipe: true,
              autoSlide: false,
            }}
            post={true}
          />
          // <Card className={classes.cardContainer} key={i}>
          //   <CardActionArea>
          //     {/* <CardMedia
          //       component="img"
          //       className={classes.media}
          //       image={item.images[0]}
          //       title={item.productName}
          //     /> */}
          //     <Carousel>
          //       {item.images.map(image => (
          //         <Carousel.Item>
          //           <Link
          //             to={"/profile/" + item.user.username}
          //             style={{ textDecoration: "none" }}
          //           >
          //             <img
          //               src={image}
          //               className={classes.media}
          //               alt={"whatsnew"}
          //             ></img>
          //           </Link>
          //         </Carousel.Item>
          //       ))}
          //     </Carousel>
          //     <CardContent>
          //       <Typography variant="body2" color="textSecondary" component="p">
          //         Rs. {item.price}
          //       </Typography>
          //       <Typography
          //         className={classes.strikeThrough}
          //         variant="body2"
          //         color="textSecondary"
          //         component="p"
          //       >
          //         Rs. {item.mrp}
          //       </Typography>
          //     </CardContent>
          //   </CardActionArea>
          // </Card>
        ))}
      </div>
      <button
        className={classes.filterBtn}
        onClick={() => {
          handleFilter();
        }}
      >
        Filter
      </button>
    </div>
  );
};

export default ProductDisplayComponent;
