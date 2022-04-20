import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Divider, IconButton, TextField } from "@material-ui/core";
import { Typography, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { Navbar } from "../components/Navbar";
import DeleteIcon from "@material-ui/icons/Delete";
import { updateQuantity, deleteQuantity } from "../redux/actions/profileAction";
import WishlistComponent from "../components/CartComonent/wishlist";
const useStyles = makeStyles({
  mainContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: 64,
    "@media (max-width:660px)": {
      marginTop: 128,
    },
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#F3F1F5",

    overflow: "visible",
    "@media (max-width:600px)": {
      flexDirection: "column-reverse",
      overflow: "scroll",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
  left: {
    position: "relative",
    top: 0,
    marginTop: 50,
    left: 0,
    alignItems: "center",
    width: "55%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:600px)": {
      width: "90%",
    },
  },
  marginTop: {
    marginTop: "2%",
  },
  productsDiv: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: 350,
    overflow: "scroll",
  },
  productDiv: {
    position: "relative",
    marginTop: "3%",
    top: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
    height: "fit-content",

    padding: "2% 0 2% 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "15%",
    "&:after": {
      content: '" "',
      display: "block",
      width: "100%",
      paddingTop: "100%",
    },
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  infosContainer: {
    position: "relative",
    top: 0,

    left: 0,
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  nameContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    "& p": {
      fontSize: "1.5rem",
      "@media (max-width:850px)": {
        fontSize: "1rem",
      },
    },
  },
  detailsContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    "@media (max-width:850px)": {
      justifyContent: "space-between",
      flexDirection: "column",
    },
  },

  infoContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "10%",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:850px)": {
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
    },
  },
  headingContainer: {
    "& p": {
      fontSize: "0.7rem",
      whiteSpace: "nowrap",
      margin: 0,
    },
  },
  valueContainer: {
    "& p": {
      fontSize: "1.1rem",
      whiteSpace: "nowrap",
      margin: 0,
    },
  },

  textField: {
    width: "100%",
  },
  right: {
    position: "relative",
    marginTop: 200,
    left: 0,
    transform: "translateY(-50%)",
    alignItems: "center",
    width: "35%",
    height: "fit-content",
    backgroundColor: "white",
    padding: "2%",
    border: "1px solid black",
    borderRadius: 5,
    marginLeft: 30,
    "@media (max-width:600px)": {
      width: "90%",
      top: 0,
      transform: "translateY(0px)",
      marginTop: 30,
    },
  },
  btn: {
    marginTop: "6%",
  },
});

const Cart = () => {
  const { auth } = useSelector((state) => state);
  const [values, setValues] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down(850));
  const classes = useStyles();

  useEffect(() => {
    setValues(auth.user.cart);
  }, [auth.user.cart]);
  useEffect(() => {
    var temp = 0;
    for (var i = 0; i < values.length; i++) {
      if (values[i].product) {
        temp += parseInt(values[i].product.price) * values[i].quantity;
      }
    }
    setTotal(temp);
  }, [values]);
  async function handleChangeQuantity(id, quantity, size) {
    dispatch(updateQuantity({ data: auth.user.cart, id, quantity, auth, size }));
    var temp = 0;
    for (var i = 0; i < values.length; i++) {
      temp += parseInt(values[i].product.price) * values[i].quantity;
    }
    setTotal(temp);
  }
  async function handleDelete(id, size) {
    dispatch(deleteQuantity({ data: auth.user.cart, id, auth, size }));
  }
  return (
    // <div>
    //   {userCart && (
    //     <>
    //       <div>{userCart[0].product.productName}</div>
    //     </>
    //   )}
    // </div>
    <div>
      <Navbar />

      <div className={classes.mainContainer}>
        <div className={classes.left}>
          <Typography variant="h5">Shopping Cart</Typography>
          {values && (
            <div className={classes.productsDiv}>
              {values.map((item, i) =>
                item.product ? (
                  <div className={`${classes.productDiv} ${classes.marginTop}`} key={i}>
                    <div className={classes.imageContainer}>
                      <img className={classes.image} src={item.product.images[0]} />
                    </div>

                    <div className={classes.infosContainer}>
                      <div className={classes.nameContainer}>
                        <Typography>{item.product.productName}</Typography>
                      </div>
                      <div className={classes.detailsContainer}>
                        <div className={classes.infoContainer}>
                          <div className={classes.headingContainer}>
                            <p>Size</p>
                          </div>
                          <div className={classes.valueContainer}>
                            <p>{item.size}</p>
                          </div>
                        </div>
                        <div className={classes.infoContainer}>
                          <div className={classes.headingContainer}>
                            <p>Price(Rs.)</p>
                          </div>
                          <div className={classes.valueContainer}>
                            <p>{item.product.price}</p>
                          </div>
                        </div>
                        <div className={classes.infoContainer}>
                          <div className={classes.headingContainer}>
                            <p>Quantity</p>
                          </div>
                          <div
                            style={match ? { width: "10%" } : { width: "100%" }}
                            className={classes.valueContainer}
                          >
                            <TextField
                              type="number"
                              defaultValue={item.quantity}
                              inputProps={{ min: 1 }}
                              onChange={(e) => {
                                handleChangeQuantity(item.product._id, e.target.value, item.size);
                              }}
                              className={classes.textField}
                            />
                          </div>
                        </div>
                        <div className={classes.infoContainer}>
                          <div className={classes.headingContainer}>
                            <p>Total Price (Rs.)</p>
                          </div>
                          <div className={classes.valueContainer}>
                            <p>{item.quantity * item.product.price}</p>
                          </div>
                        </div>
                        <div style={{ justifyContent: "center" }} className={classes.infoContainer}>
                          <IconButton aria-label="delete">
                            <DeleteIcon onClick={() => handleDelete(item.product._id, item.size)} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </div>
          )}
          <WishlistComponent />
        </div>
        <div className={classes.right}>
          <Typography gutterBottom variant="h6">
            Subtotal ({values.length}) items
          </Typography>
          <Typography gutterBottom className={classes.btn}>
            Rs. {total}
          </Typography>
          <Divider />
          <Button
            color="primary"
            disableElevation
            variant="contained"
            fullWidth
            className={classes.btn}
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
