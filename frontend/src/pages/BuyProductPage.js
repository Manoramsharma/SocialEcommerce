import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  makeStyles,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SendIcon from "@material-ui/icons/Send";
import { FormControl, InputGroup } from "react-bootstrap";
import Footer from "../components/footer";
import { useParams } from "react-router";
import { getDataAPI } from "../utils/fetchData";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Ratings from "../components/ProfilePage/Ratings";
import Linkshare from "../components/BuyProductPage/Linkshare";
import { addToCart } from "../redux/actions/profileAction";
import { likeProduct } from "../redux/actions/productAction";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import LikeButton from "../components/LikeButton";
import MainWhatsNew from "../components/homePage/MainWhatsNew";
import CustomCarousel from "../components/CustomCarousel";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  buyProducts: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
  },
  buyProductContainer: {
    position: "relative",
    top: 64,
    "@media (max-width:660px)": {
      top: 128,
    },
    left: 0,
    width: "100%",
    height: "fit-content",
  },
  buyProductDetails: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    "@media (max-width:580px)": {
      flexDirection: "column",
      padding: "4%",
    },
    justifyContent: "flex-start",
  },
  imagesContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "60%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: "3%",
  },
  mainImage: {
    position: "relative",
    top: 0,
    left: 0,
    width: "70%",
    paddingLeft: "5%",
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
      height: "auto",
      paddingLeft: "5%",
    },
  },
  imagesList: {
    position: "relative",
    top: 0,
    left: 0,
    width: "20%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
    },
  },
  subImage: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      width: "80%",
      height: "auto",
    },
    "&:hover": {
      border: "1px solid #999999",
    },
  },
  productCarousel: {
    position: "relative",
    top: 0,
    left: 0,
    paddingLeft: "25%",
    paddingRight: "25%",
    "@media (max-width:450px)": {
      paddingLeft: "0",
      paddingRight: "0",
    },
    width: "100%",
    height: "fit-content",
  },
  rightMain: {
    position: "relative",
    top: 0,
    left: 0,
    width: "32%",
    "@media (max-width:580px)": {
      width: "100%",
    },
    margin: "4%",
    marginLeft: "0px",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
  },
  userDAndL: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userDetails: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 230,
    minWidth: 230,
  },
  userAvatarCont: {
    position: "relative",
    top: 0,
    left: 0,
    width: "25%",
    height: "auto",
  },
  userAvatar: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "autos",
    },
  },
  userInfo: {
    marginLeft: 10,
    position: "relative",
    top: 0,
    left: 0,
    width: "fit-content",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
  },
  icons: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    // justifyContent:'space-around',
    justifyContent: "center",
    marginTop: "6%",
  },
  iconBtn: {
    position: "relative",
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    alignItems: "flex-start",
  },
  productText: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    "& label": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "fit-content",
      fontSize: "0.7rem",
    },
    "& p": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "fit-content",
    },
  },
  cASCategory: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
  },
  pCategory: {
    position: "relative",
    top: 0,
    left: 0,
    width: "500%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    marginTop: "4%",
  },
  rateContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    marginTop: "4%",
    justifyContent: "flex-start",
  },
  yourPrice: {
    position: "relative",
    top: 0,
    left: 0,
    width: "fit-content",
    height: "fit-content",
    margin: 0,
    padding: 0,
    fontSize: "1.5rem",
  },
  MRP: {
    position: "relative",
    top: 0,
    left: 0,
    width: "fit-content",
    height: "fit-content",
    margin: 0,
    marginLeft: "4%",
    padding: 0,
    fontSize: "1rem",
    color: "#f88787",
    textDecorationLine: "line-through",
  },
  quantity: {
    position: "relative",
    top: 0,
    left: 0,
    width: "60%",
    height: "fit-content",
    marginTop: "4%",
  },
  sizeHeading: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    fontSize: "0.7rem",
  },
  addToCart: {
    position: "relative",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "fit-content",
    height: "fit-content",
  },
  pincode: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
  },
  description: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    fontSize: 10,
  },
  marginTop: {
    marginTop: "4%",
  },
  //old styles
  left: {
    display: "flex",

    justifyContent: "space-around",
  },
  fontSize: {
    fontSize: "1rem",
  },
  bold: {
    fontWeight: "bold",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  divider: {
    height: 1,
    marginTop: "6%",
    backgroundColor: "grey",
    marginBottom: "3%",
  },

  btn1: {
    width: "fit-content",
    backgroundColor: "#34B1B9",
    color: "white",
    fontSize: 15,
  },
  btn2: {
    width: "fir-content",
    backgroundColor: "#26AF9F",
    color: "white",
    marginLeft: 20,
    fontSize: 15,
  },
  description: {
    fontSize: 10,
  },
  thingsText: {
    transform: "translateX(50%)",
    marginTop: "3%",
    marginLeft: "-5%",
    fontWeight: "bold",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "center",
    alignContent: "center",
    height: 500,
    gap: "10px 30px",
  },
  image: {
    height: 300,
    width: 300,
  },
}));
const BuyProductPage = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const theme = useTheme();
  const match = useMediaQuery("(max-width:580px");
  useEffect(async () => {
    try {
      const res = await getDataAPI(`byproductid/${id}`, null);
      if (res.data.product) {
        setValues(res.data.product);
        setLoading(true);
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        text: err,
      });
      console.log(err);
    }
  }, []);
  const classes = useStyles();

  const [size, setSize] = useState("s");
  const [quantity, setQuantity] = useState(1);

  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  const handleChangeQuantity = (n) => {
    setQuantity(n);
  };
  const handleAddToCart = () => {
    dispatch(addToCart({ size, id, quantity, auth }));
    history.push("/cart");
  };
  const handleLike = () => {
    dispatch(likeProduct({ id, auth }));
  };
  const handleImgClick = (e) => {
    setImgIndex(e.target.attributes.index.nodeValue);
  };
  return (
    <div className={classes.buyProducts}>
      <Navbar />
      {loading && (
        <div className={classes.buyProductContainer}>
          <div className={classes.buyProductDetails}>
            {/* <CarouselComponent /> */}
            {match && values ? (
              values.images && (
                <div className={classes.productCarousel}>
                  <CustomCarousel
                    arrows={true}
                    dots={true}
                    autoSlide={false}
                    swipe={true}
                    to={""}
                    items={values.images}
                  />
                </div>
              )
            ) : (
              <div className={classes.imagesContainer}>
                <div className={classes.mainImage}>
                  <img src={values.images && values.images[imgIndex]} />
                </div>
                <div className={classes.imagesList}>
                  {values.images &&
                    values.images.map((image, index) => (
                      <div
                        index={index}
                        onClick={(e) => {
                          handleImgClick(e);
                        }}
                        className={classes.subImage}
                      >
                        <img index={index} src={image} alt="product image" />
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className={classes.rightMain}>
              <div className={classes.userDAndL}>
                <div className={classes.userDetails}>
                  <Link
                    className={classes.userAvatarCont}
                    to={"/profile/" + values.user.username}
                    style={{ textDecoration: "none" }}
                  >
                    <Avatar
                      src={values.user.avatar}
                      alt="profile image"
                      className={classes.userAvatar}
                    />
                  </Link>
                  <div className={classes.userInfo}>
                    <Link
                      to={"/profile/" + values.user.username}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography className={classes.bold}>{values.user.fullname}</Typography>
                    </Link>
                    <Ratings />
                  </div>
                </div>
                <div className={classes.icons}>
                  <LikeButton fontSize={"1.6rem"} likesData={values.likes} auth={auth} id={id} />
                  <Button className={classes.iconBtn}>
                    <BookmarkBorderIcon />
                  </Button>
                  <Button className={classes.iconBtn}>
                    <Linkshare />
                  </Button>
                </div>
              </div>

              <div className={classes.divider}></div>

              <div className={classes.productText}>
                <label>Product Name</label>
                <Typography>{values.productName}</Typography>
                <div className={classes.cASCategory}>
                  <div className={classes.pCategory}>
                    <label>Product Category</label>
                    <Typography>{values.category}</Typography>
                  </div>
                  <div className={classes.pCategory}>
                    <label>Product subCategory</label>
                    <Typography>{values.subCategory}</Typography>
                  </div>
                </div>
              </div>

              <div className={classes.divider}></div>

              <div className={classes.rateContainer}>
                <Typography variant="h6" className={classes.yourPrice}>
                  Rs. {values.price * quantity}
                </Typography>
                <Typography gutterBottom variant="h6" className={classes.MRP}>
                  Rs. {values.mrp * quantity}
                </Typography>
              </div>
              <TextField
                className={classes.quantity}
                type="number"
                defaultValue={1}
                inputProps={{ min: 1 }}
                onChange={(e) => {
                  handleChangeQuantity(e.target.value);
                }}
              />
              <Typography gutterBottom className={`${classes.sizeHeading} ${classes.marginTop}`}>
                SELECT SIZE
              </Typography>
              <ToggleButtonGroup exclusive onChange={handleSize} value={size}>
                <ToggleButton value="s">S</ToggleButton>
                <ToggleButton value="m">M</ToggleButton>
                <ToggleButton value="l">L</ToggleButton>
                <ToggleButton value="xl">XL</ToggleButton>
                <ToggleButton value="xxl">XXL</ToggleButton>
              </ToggleButtonGroup>

              <div className={classes.divider}></div>

              <div className={`${classes.marginTop} ${classes.addToCart}`}>
                {/* <Button size="large" className={classes.btn1}>
                  Buy Now
                </Button> */}
                <Button size="large" className={classes.btn2} onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
              <InputGroup className={`${classes.marginTop} ${classes.pincode}`}>
                <FormControl
                  placeholder="Enter Pincode"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outlined">CHECK</Button>
              </InputGroup>
              <div className={classes.divider}></div>
              <Typography className={classes.description}>
                100% Original Products Free Delivery on order above Rs. 799 Pay on delivery might be
                available Easy 30 days returns and exchanges
              </Typography>
            </div>
          </div>
          <MainWhatsNew />
          <div style={{ position: "relative", top: 0, left: 0, width: "100%", height: 40 }}></div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default BuyProductPage;
