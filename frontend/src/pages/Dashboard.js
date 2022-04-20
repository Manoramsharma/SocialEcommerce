import { Navbar } from "../components/Navbar";
import { Avatar, makeStyles, Typography, Button } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Ratings from "../components/ProfilePage/Ratings";
import InformationComponent from "../components/Dashboard/Info";
import TopCategoryComponent from "../components/Dashboard/TopCategory";
import YourProductsComponent from "../components/Dashboard/YourProducts";
import RecentOrderComponent from "../components/Dashboard/RecentOrder";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getProfileUsers } from "../redux/actions/profileAction";

const image =
  "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D627%26cropX2%3D1639%26cropY1%3D129%26cropY2%3D1142";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background:
      "linear-gradient(150deg, rgba(240,217,255,1), rgba(191,162,219,1))",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backdropFilter: "blur(25px) saturate(200%)",
    background: "#FFFAFA",
    borderRadius: 14,
    border: "1px solid rgba(209, 213, 219, 0.3)",
    height: "85%",
    width: "90%",
    marginTop: 64,
    "@media (max-width:660px)": {
      marginTop: 128,
    },
    padding: "2%",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    display: "flex",
    width: "20%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  nameSection: {
    display: "flex",
    width: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  innerLeft: {
    width: "70%",
    height: "100%",
  },
  innerRight: {
    width: "20%",
    height: "60%",
    border: "1px solid #C8C6C6",
    borderRadius: "10px",
    padding: "2%",
  },
  container: {
    display: "flex",
    height: "90%",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  productcontainer: {
    width: "95%",
    height: "45%",
    padding: "2%",
    border: "1px solid #C8C6C6",
    borderRadius: "10px",
    marginTop: "3%",
    marginLeft: "3%",
  },
}));
const SellerDashboard = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (profile.users.every((item) => item !== auth.user.username)) {
      dispatch(
        getProfileUsers({ users: profile.users, id: auth.user.username, auth })
      );
    }
  }, [auth, dispatch, profile.users]);
  useEffect(() => {
    try {
      function filter_data(product) {
        var newData = product.filter(
          (temp) => temp.user.username === auth.user.username
        );
        setProducts(newData);
      }
      profile.product.forEach(filter_data);
    } catch (err) {
      console.log(err);
    }
  }, [profile.product]);
  return (
    <div>
      <Navbar />
      <div className={classes.mainContainer}>
        <div className={classes.card}>
          <div className={classes.topBar}>
            <div className={classes.inner}>
              <DashboardIcon />
              <Typography variant="h4">Dashboard</Typography>
            </div>
            {auth.user && (
              <>
                <div className={classes.nameSection}>
                  <Avatar src={auth.user.avatar} className={classes.large} />
                  <div>
                    <Typography>{auth.user.fullname}</Typography>
                    <Ratings />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={classes.container}>
            <div className={classes.innerLeft}>
              <InformationComponent auth={auth} />
              <YourProductsComponent products={products} auth={auth} />

              <RecentOrderComponent />
            </div>
            <div className={classes.innerRight}>
              <TopCategoryComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
