import { Typography, makeStyles, Button, TextField } from "@material-ui/core";
import "./forgotpass.css";
import forgotpass from "../images/forgotpass.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { validatePassword } from "../helper/validator";
import { useState } from "react";
import Swal from "sweetalert2";
import { postDataAPI } from "../utils/fetchData";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
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
  },
  description: {
    width: "80%",
    textAlign: "center",
    marginTop: "3%",
  },
  email: {
    alignSelf: "flex-start",
    marginLeft: "11.3%",
    marginTop: "10%",
    fontWeight: "700",
  },
  form: {
    alignSelf: "flex-start",
    marginLeft: "11.3%",
    width: "50%",
  },
  textField: {
    marginTop: "2%",
    padding: "0%",
  },
  submitBtn: {
    marginTop: "10%",
  },
  RetypePassword: {
    marginTop: "2%",
    fontWeight: "700",
  },
});

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = useStyles();

  const resetPasswordHandler = async (e) => {
    console.log("in reset password handler");
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      Swal.fire({
        icon: "error",
        title: "Password doesn't match..",
        text: "Please try again :(",
      });
    } else if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password..",
        text: "Password should be 8 characters long, should have one numerical, capital and a special character",
      });
    } else {
      console.log(email, otp, password, confirmPassword);
      try {
        const res = await postDataAPI(
          "resetPassword",
          { email, otp: parseInt(otp), newPassword: password, confirmPassword },
          null
        );
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
    }
  };

  return (
    <div className={classes.container}>
      <div class="leftMain">
        <Typography gutterBottom variant="h4" class="heading headingmain">
          S A R V H
        </Typography>
        <Typography variant="h6" class="heading sub">
          Discover the fashion trending today.
        </Typography>
        <Typography variant="h6" class="heading sub">
          Discover. Sell. Connect
        </Typography>
        <img src={forgotpass} class="image" alt="reset" />
      </div>
      <div class="rightMain">
        <div class="navRight">
          <Button className={classes.backBtn}>
            <ArrowBackIosIcon />
          </Button>
          <Typography variant="h6">
            Not a member yet? <span class="signup">Sign Up</span>
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
          <form className={classes.form} onSubmit={resetPasswordHandler}>
            <Typography className={classes.email} variant="h6">
              Enter Email
            </Typography>
            <TextField
              variant="outlined"
              required
              id="email"
              label="Enter new password"
              autoComplete="true"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              className={classes.textField}
            />
            <Typography className={classes.email} variant="h6">
              Enter OTP
            </Typography>
            <TextField
              variant="outlined"
              type="number"
              required
              id="otp"
              label="Enter new password"
              autoComplete="true"
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              className={classes.textField}
            />

            <Typography className={classes.email} variant="h6">
              Enter New Password
            </Typography>
            <TextField
              variant="outlined"
              type="password"
              required
              id="password"
              label="Enter new password"
              autoComplete="true"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              className={classes.textField}
            />
            <Typography className={classes.email} variant="h6">
              Re-Enter New Password
            </Typography>
            <TextField
              variant="outlined"
              type="password"
              required
              id="confirmPassword"
              label="Re-Enter new password"
              autoComplete="true"
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              className={classes.textField}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn}>
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
