import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  mainContainer: {
    width: "40%",
  },
  smallImagesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginTop: "2%",
  },
  smallImages: {
    width: "100%",
  },
  mainImage: {
    width: "100%",
  },
});

const ImageUploadComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.imageContainer}>
        <img
          className={classes.mainImage}
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hamilton-lead-1611181753.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*"
          alt={"uploadproduct"}
        />
        <div className={classes.smallImagesContainer}>
          <img
            className={classes.smallImages}
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hamilton-lead-1611181753.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*"
            alt={"uploadproduct"}
          ></img>
          <img
            className={classes.smallImages}
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hamilton-lead-1611181753.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*"
            alt={"uploadproduct"}
          ></img>
          <img
            className={classes.smallImages}
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hamilton-lead-1611181753.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*"
            alt={"uploadproduct"}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
