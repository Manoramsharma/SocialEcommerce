import {Navbar} from "../components/Navbar";
import { makeStyles } from "@material-ui/styles";
import UploadInfoComponent from "../components/UploadProductPage/UploadInfo";
import { Typography } from "@material-ui/core";
import Footer from "../components/footer";

const useStyles = makeStyles({
  root :{
    position:"absolute",
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    overflow:'scroll'
  },
  mainContainer: {
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:'fit-content',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",

  },
  marginTop: {
    marginTop: 80,
    "@media (max-width:660px)":{
      marginTop: 140,
    },
    paddingBottom:20,
    textAlign: "center",
    "@media (max-width:500px)":{
      fontSize:'1.5rem'
    }
  },
});
//Hello
const ProductUpload = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Typography variant="h4" className={classes.marginTop}>
        Upload Your Product
      </Typography>
      <div className={classes.mainContainer}>
        {/* <ImageUploadComponent /> */}
        <UploadInfoComponent className={classes.uploadInfo} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductUpload;
