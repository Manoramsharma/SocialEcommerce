import { Typography, makeStyles, Button, TextField } from "@material-ui/core";
import "./forgotpass.css";
import image from "../images/forgotPassword.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postDataAPI } from "../utils/fetchData";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backBtn: {
    height: "3.5rem",
    width: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  typography: {
    fontWeight: "700",
    "@media (max-width:400px)": {
      fontSize: "1.6rem",
    },
    "@media (max-width:305px)": {
      fontSize: "1.2rem",
    },
  },
  description: {
    width: "80%",
    textAlign: "center",
    marginTop: "3%",
    "@media (max-width:400px)": {
      fontSize: "0.8rem",
    },
  },
  email: {
    position: "relative",
    top: 0,
    left: 0,
    alignItems: "center",
    marginTop: "7%",
    fontWeight: "700",
  },
  form: {
    position: "relative",
    marginTop: "5%",
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  textField: {
    position: "relative",
    top: 0,
    left: 0,
    marginTop: "2%",
    width: "60%",
    "@media (max-width:400px)": {
      width: "100%",
    },
  },
  submitBtn: {
    marginTop: "10%",
    "@media (max-width:300px)": {
      fontSize: "0.7rem",
    },
  },
});

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await postDataAPI("forgotPassword", { email }, null);
      Swal.fire({
        icon: "success",
        text: res.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error Occurred",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className={classes.container}>
      <div class="leftMain">
        <img src={image} class="image" alt="forgot_pass" />
      </div>
      <div class="rightMain">
        <div class="navRight">
          <Button href="/login" className={classes.backBtn}>
            <ArrowBackIosIcon />
          </Button>
          <Typography className="signupText">
            Not a member yet?{" "}
            <a href="/signup">
              <span class="signup">Sign Up</span>
            </a>
          </Typography>
        </div>
        <div class="rightDown">
          <Typography className={classes.typography} variant="h4">
            FORGOT <span class="passwordText">PASSWORD</span>
          </Typography>
          <Typography className={classes.description} variant="h6">
            Enter the email address you used when you joined and we will send you intructions to
            reset your password
          </Typography>
          <Typography className={classes.email} variant="h6">
            Email Address
          </Typography>
          <form className={classes.form} onSubmit={forgotPasswordHandler}>
            <TextField
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn}>
              Send reset instructions
            </Button>
          </form>
          <Link to={"/resetpassword"}>
            <div className={classes.forgotPass}>Reset Password</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
