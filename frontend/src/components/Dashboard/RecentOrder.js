import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
  container: {
    height: "35%",
    width: "95%",
    padding: "2%",
    border: "1px solid #C8C6C6",
    borderRadius: "10px",
    marginTop : "2%",
    marginLeft : "3%",
  },
}));

const RecentOrderComponent = () => {
  const classes = useStyles();
  return <div className={classes.container}>
      <Typography className={classes.bold}>Recent Orders</Typography>
  </div>;
};

export default RecentOrderComponent;
