import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { makeStyles, Typography, Button } from "@material-ui/core";
import Image1 from "../images/undraw_Online_shopping_re_k1sv.svg";
import Image2 from "../images/undraw_stepping_up_g6oo.svg";
import Image4 from "../images/undraw_Mobile_payments_re_7udl.svg";
import Image5 from "../images/undraw_Add_post_re_174w.svg";
import Image6 from "../images/undraw_social_friends_nsbv.svg";
import Image7 from "../images/undraw_On_the_way_re_swjt.svg";
import Image8 from "../images/undraw_wallet_aym5.svg";
import Testimonial from "../components/SellOnSarvhPage/Testimonial";
import { Card } from "react-bootstrap";
import Footer from "../components/footer";

const useStyles = makeStyles({
  topContainer: {
    height: "50vh",
    backgroundColor: "rgba(29, 153, 243, 0.2)",
    marginTop: 64,
    "@media (max-width:660px)":{
      marginTop:128,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  leftTopContainer: {
    height: "70%",
    width: "50%",
  },
  rightTopContainer: {
    height: "85%",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  marginTop: {
    marginTop: "4%",
  },
  images: {
    height: "50%",
  },
  marginLeft: {
    marginLeft: "40%",
  },
  imageLeft: {
    alignSelf: "flex-start",
  },
  btn: {
    marginTop: "20%",
    fontSize: "1.5rem",
    width: "50%",
  },
  center: {
    textAlign: "center",
  },
  sellContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "2%",
    marginBottom: "2%",
  },
  card: {
    width: "19%",
    padding: "2%",
  },
  image: {
    height: "50%",
  },
});

const SellPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <div className={classes.topContainer}>
        <div className={classes.leftTopContainer}>
          <Typography variant="h3">Sell On Sarvh</Typography>
          <Typography className={classes.marginTop} variant="h5">
            Sell your products and connect with large audience on our social
            commerce. Start your great beginnings today.
          </Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              size="large"
              color="secondary"
              variant="outlined"
              className={classes.btn}
            >
              REGISTER NOW
            </Button>
          </Link>
        </div>
        <div className={classes.rightTopContainer}>
          <img
            className={`${classes.images} ${classes.imageLeft}`}
            src={Image1}
          />
          <img
            className={`${classes.images} ${classes.marginLeft}`}
            src={Image2}
          />
        </div>
      </div>
      <Typography
        variant="h4"
        color="secondary"
        className={`${classes.center} ${classes.marginTop}`}
      >
        This Why We Do
      </Typography>
      <Typography
        variant="h4"
        color="secondary"
        className={classes.center}
      >
        What We Do.
      </Typography>
      <Testimonial />
      <Typography
        variant="h4"
        color="secondary"
        className={`${classes.center} ${classes.marginTop}`}
      >
        How to sell on Sarvh
      </Typography>
      <div className={classes.sellContainer}>
        <Card className={classes.card}>
          <Card.Img variant="top" src={Image4} className={classes.image} />
          <Card.Body>
            <Card.Title>Register</Card.Title>
            <Card.Text>Fill in form and get your documents verified</Card.Text>
          </Card.Body>
        </Card>
        <Card className={classes.card}>
          <Card.Img variant="top" src={Image5} className={classes.image} />
          <Card.Body>
            <Card.Title>List</Card.Title>
            <Card.Text>Upload your products </Card.Text>
          </Card.Body>
        </Card>
        <Card className={classes.card}>
          <Card.Img variant="top" src={Image6} className={classes.image} />
          <Card.Body>
            <Card.Title>Sell</Card.Title>
            <Card.Text>Get orders from your large customer base</Card.Text>
          </Card.Body>
        </Card>
        <Card className={classes.card}>
          <Card.Img variant="top" src={Image7} className={classes.image} />
          <Card.Body>
            <Card.Title>Deliver</Card.Title>
            <Card.Text>
              Get the itms picked up by you place and delivered
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className={classes.card}>
          <Card.Img variant="top" src={Image8} className={classes.image} />
          <Card.Body>
            <Card.Title>Get Paid</Card.Title>
            <Card.Text>Payments will be transferred to your account</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SellPage;
