import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import { width } from "dom-helpers";
import him from "../../images/3.svg";
import her from "../../images/1.svg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  him: {
    width: "30vw",
    padding: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
    },
  },
  her: {
    width: "30vw",
    padding: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
    },
  },
  herdiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  categories: {},
}));

const SelectGender = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  function herClick() {
    history.push("/bycategories?category=Women");
  }

  function himClick() {
    history.push("/bycategories?category=Men");
  }
  return (
    <div>
      <div className={classes.categories}></div>
      <div className={classes.herdiv}>
        {" "}
        <img src={him} alt="him" onClick={himClick} className={classes.him} />
        <img src={her} alt="her" className={classes.her} onClick={herClick} />{" "}
      </div>
    </div>
  );
};

export default SelectGender;
