import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Signupimg from "../images/Signupimg.jpg";
import { register } from "../redux/actions/authAction";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import { validateEmail, validatePassword } from "../helper/validator";
import { Navbar } from "../components/Navbar";
// import "./Signup.css"

const useStyles = makeStyles(theme => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",

    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
  mainContainer: {
    width: "50%",
    [theme.breakpoints.down("sm")]: { width: "80%" },
    edit: {
      fontSize: 2,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "6%",
  },
  btn: {
    position:"relative",
    top:'0',
    left:"50%",
    transform:'translateX(-50%)',
    marginTop: "5%",
    fontSize: "1rem",
  },
  imghere: {
    fontSize: "1rem",
  },
  /*  inputRoot: {
    fontSize: 30
  }, */
  labelRoot: {
    /*  [theme.breakpoints.down("sm")]:
    {
      fontSize: 30,
    
    }, */
    /* color: "red",
     "&$labelFocused": {
      color: "purple"
    } */
  },
  labelFocused: {},
}));

function Signup(props) {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [emailError, setEmailError] = useState(false);
  const [fullnameError, setFullnameError] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  const signUpForm = e => {
    e.preventDefault();
    if (fullname === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Please enter valid name",
      });
      setFullnameError(true);
    } else if (!validateEmail(email)) {
      setEmailError(true);
      Swal.fire({
        icon: "error",
        title: "Invalid Email...",
        text: "Please try again :(",
      });
    } else {
      // checking if password is same or not
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Password doesn't match..",
          text: "Please try again :(",
        });
      } else {
        // if password is same
        if (!validatePassword(password)) {
          // validating password
          Swal.fire({
            icon: "error",
            title: "Invalid Password..",
            text: "Password should be 8 characters long, should have one numerical, capital and a special character",
          });
        } else {
          const userData = {
            fullname,
            username,
            email,
            password,
            gender,
          };
          dispatch(register(userData));
        }
      }
    }
  };

  return (
    <div>
      <div className="main">
        <div className="imgbg">
          <img src={Signupimg} alt="" className="imghere" />
        </div>
        <div className="mainlog">
          <Navbar />
          <Container className={classes.mainContainer}>
            <Typography
              variant="h5"
              color="textPrimary"
              component="h2"
              style={{whiteSpace:"nowrap"}}
              gutterBottom
            >
              Signup to Continue
            </Typography>
            <form noValidate autoComplete="off" onSubmit={signUpForm}>
              <TextField
                className={classes.field}
                className={classes.edit}
                id="outlined-basic"
                label="Full Name"
                variant="standard"
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                color="secondary"
                fullWidth
                required
                error={fullnameError}
                // helperText={text === "asdf" ? 'Empty field!' : ' '}
                onChange={e => setFullname(e.target.value)}
              />
              <TextField
                className={classes.field}
                label="Username"
                variant="standard"
                color="secondary"
                fullWidth
                required
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                className={classes.field}
                label="Email"
                variant="standard"
                color="secondary"
                fullWidth
                required
                onChange={e => setEmail(e.target.value)}
                error={emailError}
              />
              <TextField
                className={classes.field}
                label="Password"
                variant="standard"
                color="secondary"
                fullWidth
                required
                type="password"
                helperText="
                Minimum 8 characters:
                1 capital, 1 small, 1 special character allowed"
                onChange={e => setPassword(e.target.value)}
              />
              <TextField
                className={classes.field}
                label="Confirm Password"
                variant="standard"
                color="secondary"
                fullWidth
                required
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <TextField
                label="Gender"
                value={gender}
                select
                fullWidth
                onChange={e => setGender(e.target.value)}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </TextField>
              <Button
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                className={classes.btn}
                endIcon={<KeyboardArrowRightIcon />}
              >
                Sign Up
              </Button>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Signup;
