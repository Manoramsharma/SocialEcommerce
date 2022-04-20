import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import { width } from "dom-helpers";

const useStyles = makeStyles({
  fotter: {
    left: "0",
    bottom: "0",
    width: "100%",
    position: "fixed",
  },
});

const FooterForCategory = () => {
  const classes = useStyles();
  return (
    <div className={classes.fotter}>
      <div style={{ height: "200px", backgroundColor: "black" }}></div>
    </div>
  );
};

export default FooterForCategory;
