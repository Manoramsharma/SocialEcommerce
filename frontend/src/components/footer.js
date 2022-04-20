import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import { height } from "dom-helpers";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fotter: {
    position: "relative",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "300px",
    backgroundColor: "#181818",
    display: "flex",
    flexDirection: "row",
    color: "white",
    justifyContent: "space-around",
    padding: "2%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-around",
      display: "none",
    },
  },
  fotterheading: {
    marginTop: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fottercontent: {
    color: "#D6BDFF",
    fontSize: "1.5rem",
  },
  links: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();

  function BLOGbtn() {
    history.push("https://www.sarvh.com#blogs");
  }

  return (
    <div className={classes.fotter}>
      <div className={classes.fotterheading}>
        <div>
          <div className={classes.fottercontent}>COMPANY</div>
          <div style={{ marginTop: "10px" }}>
            <div>ABOUT US</div>
            <div onClick={BLOGbtn}>BLOG</div>
          </div>{" "}
        </div>{" "}
      </div>
      <div className={classes.fotterheading}>
        <div>
          <div className={classes.fottercontent}>HELP</div>
          <div style={{ marginTop: "10px" }}>
            <Link className={classes.links} to="/contactus">
              <div>CONTACT US</div>
            </Link>

            <div>PRIVACY POLICY</div>
            <div>
              SHIPPING & <br /> RETURN POLICY
            </div>
            <div>TERMS & CONDITIONS</div>
          </div>{" "}
        </div>
      </div>
      <div className={classes.fotterheading}>
        <div>
          <div className={classes.fottercontent}>SELL WITH US</div>
          <div style={{ marginTop: "10px" }}>
            <div>SELL ON SARVH</div>
            <div>REGISTRATION</div>
          </div>{" "}
        </div>{" "}
      </div>
      <div className={classes.fotterheading}>
        <div>
          <div className={classes.fottercontent}>CONNECT WITH US</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div>
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4865 2.22724C19.5445 2.14647 19.4589 2.04218 19.3662 2.07811C18.7075 2.33344 18.019 2.50571 17.3168 2.5906C18.0987 2.12348 18.7021 1.4124 19.0366 0.570533C19.0707 0.484774 18.9771 0.408187 18.8963 0.452801C18.1696 0.854139 17.3858 1.14313 16.5717 1.30957C16.5376 1.31654 16.5025 1.30494 16.4785 1.27969C15.8676 0.635016 15.0633 0.205781 14.1866 0.0574517C13.2914 -0.0939932 12.3713 0.0559587 11.5706 0.48379C10.7698 0.911621 10.1337 1.59313 9.76203 2.42144C9.40862 3.209 9.31325 4.08691 9.48756 4.93003C9.50109 4.99545 9.44988 5.05721 9.38321 5.05307C7.79916 4.95469 6.25145 4.53336 4.83544 3.81446C3.42303 3.09739 2.1723 2.09983 1.15943 0.883296C1.11447 0.829305 1.02928 0.836293 0.996523 0.898445C0.681353 1.49651 0.516337 2.16311 0.516786 2.8406C0.515506 3.51498 0.681003 4.17922 0.998541 4.77416C1.31608 5.36911 1.7758 5.87631 2.33679 6.2506C1.74186 6.23441 1.15853 6.08734 0.628034 5.82067C0.559667 5.78631 0.47766 5.83524 0.481215 5.91167C0.522584 6.80091 0.849037 7.69364 1.4141 8.37857C2.01542 9.10744 2.85004 9.60624 3.77679 9.7906C3.42004 9.89917 3.04966 9.95641 2.67679 9.9606C2.47384 9.95823 2.2713 9.94325 2.07032 9.91578C1.9958 9.90559 1.93495 9.97637 1.96104 10.0469C2.23746 10.7944 2.72578 11.4467 3.36786 11.9228C4.05431 12.4318 4.88236 12.7142 5.73679 12.7306C4.29399 13.8659 2.51267 14.4855 0.676786 14.4906C0.488142 14.4912 0.299583 14.4851 0.111467 14.4723C0.00545914 14.4651 -0.0432957 14.6063 0.0480797 14.6605C1.83685 15.7221 3.88137 16.2831 5.96679 16.2806C7.50648 16.2966 9.03392 16.0056 10.4599 15.4247C11.8859 14.8437 13.1818 13.9845 14.272 12.8971C15.3622 11.8097 16.2248 10.516 16.8093 9.09151C17.3939 7.66702 17.6888 6.14033 17.6768 4.6006V4.12077C17.6768 4.0892 17.6917 4.05951 17.7169 4.04048C18.3952 3.52834 18.9917 2.91691 19.4865 2.22724Z"
                  fill="none"
                  stroke="white"
                />
              </svg>
            </div>
            <div>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4421 4.45757C13.4421 3.90528 13.8898 3.45757 14.4421 3.45757C14.9944 3.45757 15.4421 3.90528 15.4421 4.45757C15.4421 5.00985 14.9944 5.45757 14.4421 5.45757C13.8898 5.45757 13.4421 5.00985 13.4421 4.45757Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44208 4.70757C6.81873 4.70757 4.69208 6.83421 4.69208 9.45757C4.69208 12.0809 6.81873 14.2076 9.44208 14.2076C12.0654 14.2076 14.1921 12.0809 14.1921 9.45757C14.1921 6.83421 12.0654 4.70757 9.44208 4.70757ZM6.19208 9.45757C6.19208 7.66264 7.64715 6.20757 9.44208 6.20757C11.237 6.20757 12.6921 7.66264 12.6921 9.45757C12.6921 11.2525 11.237 12.7076 9.44208 12.7076C7.64715 12.7076 6.19208 11.2525 6.19208 9.45757Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.7003 0.290581C11.2338 -0.0968602 7.65042 -0.0968602 4.18385 0.290581C2.17179 0.515458 0.547457 2.10047 0.310903 4.123C-0.103634 7.6673 -0.103635 11.2478 0.310903 14.7921C0.547457 16.8147 2.17179 18.3997 4.18385 18.6245C7.65042 19.012 11.2338 19.012 14.7003 18.6245C16.7124 18.3997 18.3367 16.8147 18.5733 14.7921C18.9878 11.2478 18.9878 7.66729 18.5733 4.123C18.3367 2.10047 16.7124 0.515458 14.7003 0.290581ZM4.35046 1.7813C7.7063 1.40623 11.1779 1.40623 14.5337 1.7813C15.8638 1.92996 16.9293 2.97957 17.0834 4.29725C17.4844 7.72577 17.4844 11.1894 17.0834 14.6179C16.9293 15.9356 15.8638 16.9852 14.5337 17.1338C11.1779 17.5089 7.7063 17.5089 4.35046 17.1338C3.02035 16.9852 1.95486 15.9356 1.80075 14.6179C1.39975 11.1894 1.39975 7.72577 1.80075 4.29725C1.95486 2.97957 3.02035 1.92996 4.35046 1.7813Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.23769 1.53769C5.22225 0.553123 6.55761 0 7.95 0H10.65C11.0642 0 11.4 0.335786 11.4 0.75V4.35C11.4 4.76421 11.0642 5.1 10.65 5.1H7.95C7.91022 5.1 7.87206 5.1158 7.84393 5.14393C7.8158 5.17206 7.8 5.21022 7.8 5.25V7.2H10.65C10.881 7.2 11.099 7.3064 11.2412 7.48844C11.3833 7.67048 11.4336 7.90785 11.3776 8.1319L10.4776 11.7319C10.3941 12.0658 10.0942 12.3 9.75 12.3H7.8V18.75C7.8 19.1642 7.46421 19.5 7.05 19.5H3.45C3.03579 19.5 2.7 19.1642 2.7 18.75V12.3H0.75C0.335786 12.3 0 11.9642 0 11.55V7.95C0 7.53579 0.335786 7.2 0.75 7.2H2.7V5.25C2.7 3.85761 3.25312 2.52226 4.23769 1.53769ZM7.95 1.5C6.95544 1.5 6.00161 1.89509 5.29835 2.59835C4.59509 3.30161 4.2 4.25544 4.2 5.25V7.95C4.2 8.36421 3.86421 8.7 3.45 8.7H1.5V10.8H3.45C3.86421 10.8 4.2 11.1358 4.2 11.55V18H6.3V11.55C6.3 11.1358 6.63579 10.8 7.05 10.8H9.16442L9.68942 8.7H7.05C6.63579 8.7 6.3 8.36421 6.3 7.95V5.25C6.3 4.81239 6.47384 4.39271 6.78327 4.08327C7.09271 3.77384 7.51239 3.6 7.95 3.6H9.9V1.5H7.95Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.81317 12.9575V5.54355H7.16617V12.9575H5.81317Z" fill="white" />
                <path
                  d="M9.64701 12.9575H8.28302V9.19555C8.28302 8.57955 8.27202 8.06255 8.23902 7.60055H9.42702L9.49302 8.40355H9.52601C9.75702 7.98555 10.34 7.47955 11.231 7.47955C12.166 7.47955 13.134 8.08455 13.134 9.77855V12.9575H11.781V9.93255C11.781 9.16255 11.495 8.57955 10.758 8.57955C10.219 8.57955 9.84501 8.96455 9.70201 9.37155C9.65802 9.49255 9.64701 9.65755 9.64701 9.81155V12.9575Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.7003 0.290581C11.2338 -0.0968602 7.65042 -0.0968602 4.18385 0.290581C2.17179 0.515458 0.547457 2.10047 0.310903 4.123C-0.103634 7.6673 -0.103635 11.2478 0.310903 14.7921C0.547457 16.8147 2.17179 18.3997 4.18385 18.6245C7.65042 19.012 11.2338 19.012 14.7003 18.6245C16.7124 18.3997 18.3367 16.8147 18.5733 14.7921C18.9878 11.2478 18.9878 7.66729 18.5733 4.123C18.3367 2.10047 16.7124 0.515458 14.7003 0.290581ZM4.35046 1.7813C7.7063 1.40623 11.1779 1.40623 14.5337 1.7813C15.8638 1.92996 16.9293 2.97957 17.0834 4.29725C17.4844 7.72577 17.4844 11.1894 17.0834 14.6179C16.9293 15.9356 15.8638 16.9852 14.5337 17.1338C11.1779 17.5089 7.7063 17.5089 4.35046 17.1338C3.02035 16.9852 1.95486 15.9356 1.80075 14.6179C1.39975 11.1894 1.39975 7.72577 1.80075 4.29725C1.95486 2.97957 3.02035 1.92996 4.35046 1.7813Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
