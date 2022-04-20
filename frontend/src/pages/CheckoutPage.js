import {
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Navbar } from "../components/Navbar";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  addressDiv: {
    marginTop: 64,
    "@media (max-width:660px)":{
      marginTop:128,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    '@media (max-width: 825px)' : {
      width : '85%',
      marginLeft : "50%",
      transform: "translateX(-50%)"
    }
  },
  textContainers: {
    display: "flex",
    width: "90vw",
    justifyContent: "space-evenly",
    marginTop: "2%",
    "@media (max-width: 570px)":{
      flexDirection: "column"
    }
  },
  input: {
    height: 30,
  },
  inputDiv: {
    height: 70,
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    width: "40%",
    "@media (max-width: 768px)":{
      width: "45%",
    },
    "@media (max-width: 570px)":{
      width : "90%",
      marginLeft : "50%",
      transform: "translateX(-50%)"
    }
  },
  btn: {
    marginLeft: "50%",
    transform: "translateX(-50%)",
    marginTop: "3%",
    width: "20%",
    '@media (max-width: 825px)' : {
      width : '30%',
    },
    "@media (max-width: 768px)":{
      width : "40%"
    },
    "@media (max-width: 380px)":{
      width : "50%"
    },
  },
  paymentDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "3%",
    border: "1px solid grey",
    width: "80%",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    padding: "1%",
    marginBottom: "2%",
    '@media (max-width: 825px)' : {
      width : '85%',
    },
    "@media (max-width: 768px)":{
      padding : '3%'
    },
    "@media (max-width: 768px)":{
      marginTop : "5%",
      padding : "5%"
    },
  },
  paymentForm: {
    marginTop: "3%",
    width: "100%",
  },
  heading : {
    "@media (max-width: 980px)":{
      fontSize: "2rem"
    },
    "@media (max-width: 768px)":{
      fontSize: "1.5rem"
    }
  }
});

const CheckoutPage = () => {
  const [state, setState] = useState("");
  const classes = useStyles();
  const handleChange = (event) => {
    setState(event.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className={classes.addressDiv}>
        <Typography className={classes.heading} variant="h4" color="primary">
          Add your address
        </Typography>
        <form>
          <div className={classes.textContainers}>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                Full name (First and Last name)
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                placeholder="Full Name"
              ></OutlinedInput>
            </div>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                Mobile number
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                placeholder="10-digit mobile number without prefixes"
              ></OutlinedInput>
            </div>
          </div>
          <div className={classes.textContainers}>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                PIN code
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                placeholder="6 digits [0-9] PIN Code"
              ></OutlinedInput>
            </div>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                Flat, House no., Building, Company, Apartment
              </InputLabel>
              <OutlinedInput className={classes.input}></OutlinedInput>
            </div>
          </div>
          <div className={classes.textContainers}>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                Area, Colony, Street, Sector, Village
              </InputLabel>
              <OutlinedInput className={classes.input}></OutlinedInput>
            </div>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                Landmark
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                placeholder="E.g. Near AIIMS Flyover, etc."
              ></OutlinedInput>
            </div>
          </div>
          <div className={classes.textContainers}>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                Town/City
              </InputLabel>
              <OutlinedInput className={classes.input}></OutlinedInput>
            </div>
            <div className={classes.inputDiv}>
              <InputLabel shrink htmlFor="name-input">
                State / Province / Region
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state}
                label="State"
                onChange={handleChange}
              >
                <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
                <MenuItem value={"Arunachal Pradesh"}>
                  Arunachal Pradesh
                </MenuItem>
                <MenuItem value={"Assam"}>Assam</MenuItem>
                <MenuItem value={"Bihar"}>Bihar</MenuItem>
                <MenuItem value={"Chhattisgarh"}>Chhattisgarh</MenuItem>
                <MenuItem value={"Goa"}>Goa</MenuItem>
                <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                <MenuItem value={"Haryana"}>Haryana</MenuItem>
                <MenuItem value={"Himachal Pradesh"}>Himachal Pradesh</MenuItem>
                <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
                <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                <MenuItem value={"Kerala"}>Kerala</MenuItem>
                <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                <MenuItem value={"Manipur"}>Manipur</MenuItem>
                <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
                <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
                <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
                <MenuItem value={"Odisha"}>Odisha</MenuItem>
                <MenuItem value={"Punjab"}>Punjab</MenuItem>
                <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
                <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                <MenuItem value={"Telangana"}>Telangana</MenuItem>
                <MenuItem value={"Tripura"}>Tripura</MenuItem>
                <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
                <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
                <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
                <MenuItem value={"Andaman and Nicobar Islands"}>
                  Andaman and Nicobar Islands
                </MenuItem>
                <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
                <MenuItem value={"Dadra Nagar Haveli and Daman Diu"}>
                  Dadra Nagar Haveli and Daman Diu
                </MenuItem>
                <MenuItem value={"Delhi"}>Delhi</MenuItem>
                <MenuItem value={"Jammu and Kashmir"}>
                  Jammu and Kashmir
                </MenuItem>
                <MenuItem value={"Ladakh"}>Ladakh</MenuItem>
                <MenuItem value={"Lakshadweep"}>Lakshadweep</MenuItem>
                <MenuItem value={"Puducherry"}>Puducherry</MenuItem>
              </Select>
            </div>
          </div>
          <Button variant="contained" color="secondary" className={classes.btn}>
            Add Address
          </Button>
        </form>
      </div>
      <div className={classes.paymentDiv}>
        <Typography className={classes.heading} variant="h4" color="primary">
          Select Payment Method
        </Typography>
        <form className={classes.paymentForm}>
          <RadioGroup
            aria-label="payment-method"
            defaultValue="Card"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Card"
              control={<Radio />}
              label="
Add Debit/Credit/ATM Card"
            />
            <FormControlLabel
              value="UPI"
              control={<Radio />}
              label="Other UPI Apps"
            />
            <FormControlLabel
              value="COD"
              control={<Radio />}
              label="Pay on Delivery"
            />
          </RadioGroup>
          <Button variant="contained" color="primary" className={classes.btn}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
