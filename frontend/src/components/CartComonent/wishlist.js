import { makeStyles, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
const image =
  "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg";
const useStyles = makeStyles({
  WishlistMainContainer: {
    marginTop: "5%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wishlistContainer: {
    width: "100%",
    height: 300,
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
});

const WishlistComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.WishlistMainContainer}>
      <Typography variant="h5">Your Wishlist</Typography>
      <div className={classes.wishlistContainer}>
        <div className={classes.productsDiv}>
          <div className={classes.productDiv}>
            <div className={classes.imageContainer}>
              <img className={classes.image} src={image} />
            </div>

            <div className={classes.infosContainer}>
              <div className={classes.nameContainer}>
                <Typography>Product Name</Typography>
              </div>
              <div className={classes.detailsContainer}>
                <div className={classes.infoContainer}>
                  <div className={classes.headingContainer}>
                    <p>Size</p>
                  </div>
                  <div className={classes.valueContainer}>
                    <p>S</p>
                  </div>
                </div>
                <div className={classes.infoContainer}>
                  <div className={classes.headingContainer}>
                    <p>Price(Rs.)</p>
                  </div>
                  <div className={classes.valueContainer}>
                    <p>2000</p>
                  </div>
                </div>

                <div
                  style={{ justifyContent: "center" }}
                  className={classes.infoContainer}
                >
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistComponent;
