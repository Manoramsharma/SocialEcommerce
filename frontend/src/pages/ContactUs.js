import TopImage from "../images/image3.png";
import { Navbar } from "../components/Navbar";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";
import Footer from "../components/footer";
import { useState } from "react";
import Swal from "sweetalert2";
import { postDataAPI } from "../utils/fetchData";
const useStyles = makeStyles({
  TopImage: {
    width: "100%",
    heigth: "auto",
  },
  imageDiv: {
    width: "100vw",
    backgroundColor: "yellow",
    marginTop: 67,
    "@media screen and (max-width:660px)": {
      display: "none",
    },
  },
  Heading: {
    display: "none",
    marginTop: 150,
    fontWeight: "bold",
    "@media screen and (max-width:660px)": {
      display: "block",
      textAlign: "center",
    },
  },
  mainContainer: {
    padding: "4%",
    display: "flex",
    justifyContent: "center",
    "@media screen and (max-width:660px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  leftContainer: {
    "@media screen and (max-width:660px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  topContainer: {
    "@media screen and (max-width:660px)": {},
  },
  normalText: {
    marginTop: "10%",
  },
  bottomContainer: {},
  rightContainer: {
    backgroundColor: "rgba(239, 169, 168, 0.22)",
    borderRadius: 10,
    marginLeft: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: "2%",
    paddingTop: 0,
    width: "40%",
    height: 700,
    "@media screen and (max-width:1178px)": {
      width: "50%",
    },
    "@media screen and (max-width:900px)": {
      width: "60%",
    },
    "@media screen and (max-width:660px)": {
      marginTop: "5%",
      width: "80%",
      marginLeft: "0",
      padding: "5%",
    },
    "@media screen and (max-width:400px)": {
      width: "90%",
    },
  },
  input: {
    marginTop: "2%",
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "white",
    width: "90%",
    padding: "1%",
    alignSelf: "center",
    boxShadow: "none",
    border: "1px solid black",
    borderRadius: "10px",
  },
});
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postDataAPI("contactUs", { name, email, phone, message });
      Swal.fire({
        icon: "success",
        text: res.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Typography variant="h4" className={classes.Heading}>
        CONTACT US
      </Typography>
      <div className={classes.imageDiv}>
        <img src={TopImage} alt="" className={classes.TopImage} />
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.topContainer}>
            <Typography variant="h5">REACH US AT:</Typography>
            <Typography className={classes.normalText}>
              Phone: <br /> +91 87001 39913
            </Typography>
            <Typography className={classes.normalText}>
              Email: <br /> wearesarvh@gmail.com
            </Typography>
          </div>
          <div className={classes.bottomContainer}></div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={classes.rightContainer}>
          <Typography variant="h5">TELL US HERE:</Typography>
          <div className={classes.inputContainer}>
            <Typography>Name : </Typography>
            <TextField
              size="small"
              className={classes.input}
              placeholder="Enter your Name"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.inputContainer}>
            <Typography>Phone : </Typography>
            <TextField
              size="small"
              className={classes.input}
              placeholder="Enter your Phone Number"
              variant="outlined"
              fullWidth
              type="number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={classes.inputContainer}>
            <Typography>Email : </Typography>
            <TextField
              size="small"
              className={classes.input}
              placeholder="Enter your Email"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.inputContainer}>
            <Typography>Message : </Typography>
            <TextField
              size="small"
              className={classes.input}
              placeholder="Enter your Message"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={5}
            />
          </div>
          <button className={classes.btn}>Send</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
