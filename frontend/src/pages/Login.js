import React, { useState } from "react";
import "./Login.css";
import Loginimg from "../images/Loginimg.jpg";
import { useHistory, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import { validateEmail, validatePassword } from "../helper/validator";
import { login, googlelogin, facebooklogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import HomeIcon from "@material-ui/icons/Home";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Navbar } from "../components/Navbar";

axios.defaults.withCredentials = true;

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%",
  },
  btn: {
    marginTop: "5%",
    width: "50%",
    marginLeft: 90,
    "@media (max-width:300px)": {
      width: "100%",
      marginLeft: 0,
    },
  },
  forgotPass: {
    letterSpacing: "0.1rem",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
  },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  async function loginAPI(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email...",
        text: "Please try again :(",
      });
    } else if (!validatePassword(password)) {
      // validating password
      Swal.fire({
        icon: "error",
        title: "Invalid Password..",
        text: "Password should be 8 characters long, should have one numerical, capital and a special character",
      });
    } else {
      const userData = {
        email: email,
        password: password,
      };
      dispatch(login(userData));
    }
  }
  const responseGoogle = (response) => {
    dispatch(googlelogin(response));
  };
  const responseFacebook = (response) => {
    dispatch(facebooklogin(response));
  };
  return (
    <div>
      <div className="main" id="left-sidebar">
        <div className="imgbg">
          <img src={Loginimg} alt="" className="imghere" />
        </div>
        <div className="mainlog">
          <Navbar />
          <div>
            <Container className={classes.mainContainer}>
              <Typography variant="h5" color="textPrimary" component="h2" gutterBottom>
                Login to Continue
              </Typography>
              <form noValidate autoComplete="off" onSubmit={loginAPI}>
                <TextField
                  className={classes.field}
                  label="Username or Email"
                  variant="standard"
                  color="secondary"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  className={classes.field}
                  label="Password"
                  variant="standard"
                  type="password"
                  colors="primary"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link to={"/forgotpassword"}>
                  <div className={classes.forgotPass}>Forgot Password</div>
                </Link>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                  className={classes.btn}
                >
                  Submit
                </Button>
              </form>
            </Container>
          </div>

          <div className="mainbtn">
            <Typography style={{ whiteSpace: "nowrap" }} gutterBottom>
              Or Log in with
            </Typography>
            <GoogleLogin
              clientId="240650313405-8u85vv2auaabjq44cle3126gbnm3mi12.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className={classes.googleButton}
            />
            <FacebookLogin
              appId="558674212075076"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              textButton="Facebook"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
