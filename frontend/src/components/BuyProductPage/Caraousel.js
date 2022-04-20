import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  image: {
    height: 500,
    backgroundColor: "#000000",
    width: 400,
  },
});

const CarouselComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <img
        className={classes.image}
        src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt={"carousel"}
      />
    </div>
  );
};

export default CarouselComponent;
