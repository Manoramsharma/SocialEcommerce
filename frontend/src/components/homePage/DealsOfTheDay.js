import React from "react";
import sweater from "../../images/SWEATERS_UNDER.svg";
import Autumn from "../../images/Autumn.svg";
import { makeStyles, useTheme } from "@material-ui/core";
import handd from "../../images/HandD.svg";
import newarriwal from "../../images/NEW_ARRIVAL.svg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  MainDeals: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    marginLeft: "10px",
    marginRight: "10px",
    justifyItems: "center",
  },
  dealstext: {
    fontFamily: "Poppins, sans-serif;",
    marginTop: "2%",
    padding: "1%",
    marginLeft: "5%",
    fontSize: "2rem",
    fontWeight: "800",
  },
}));

const DealsOfTheDay = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  function sweaterClick() {
    history.push("/");
  }
  function autumnClick() {
    history.push("/");
  }
  function handdClick() {
    history.push("/");
  }
  function newarriwalClick() {
    history.push("/");
  }
  return (
    <div>
      <div className={classes.dealstext}>Deals Of The Day</div>
      <div className={classes.MainDeals}>
        <img
          src={sweater}
          alt=""
          style={{ height: "25vw", cursor: "pointer" }}
          onClick={sweaterClick}
        />
        <img
          src={Autumn}
          alt=""
          style={{ height: "25vw", cursor: "pointer" }}
          onClick={autumnClick}
        />
        <img
          src={handd}
          alt=""
          style={{ height: "25vw", cursor: "pointer" }}
          onClick={handdClick}
        />
        <img
          src={newarriwal}
          alt=""
          style={{ height: "25vw", cursor: "pointer" }}
          onClick={newarriwalClick}
        />
      </div>
    </div>
  );
};

export default DealsOfTheDay;
