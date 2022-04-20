import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import TimelineIcon from "@material-ui/icons/Timeline";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  common: {
    display: "flex",
    backgroundColor: "rgba(240,217,255,0.5)",
    padding: "2%",
    width: "30%",
    height: 100,
    // backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  marginLeft: {
    marginLeft: "10%",
  },
  second: {
    backgroundColor: "rgba(205, 240, 234, 0.5)",
  },
  third: {
    backgroundColor: "rgba(239, 187, 207, 0.5)",
  },
  large: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  bold: {
    fontWeight: "bold",
  },
  light: {
    fontWeight: "light",
  },
  purple: {
    color: "#C490E4",
  },
  blue: {
    color: "#78DEC7",
  },
  pink: {
    color: "#FF94CC",
  },
}));

const InformationComponent = ({ auth }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={`${classes.common} ${classes.boxOne}`}>
        <MonetizationOnIcon className={`${classes.large} ${classes.purple}`} />
        <div className={classes.marginLeft}>
          <Typography className={classes.light}>Total Sales</Typography>
          <Typography variant="h5" className={classes.bold}>
            --
          </Typography>
        </div>
      </div>
      <div className={`${classes.common} ${classes.second}`}>
        <TimelineIcon className={`${classes.large} ${classes.blue}`} />
        <div className={classes.marginLeft}>
          <Typography className={classes.light}>Total Visitors</Typography>
          <Typography variant="h5" className={classes.bold}>
            {auth.user.profilevisitors.length}
          </Typography>
        </div>
      </div>
      <div className={`${classes.common} ${classes.third}`}>
        <LocalMallIcon className={`${classes.large} ${classes.pink}`} />
        <div className={classes.marginLeft}>
          <Typography className={classes.light}>Total Orders</Typography>
          <Typography variant="h5" className={classes.bold}>
            --
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default InformationComponent;
