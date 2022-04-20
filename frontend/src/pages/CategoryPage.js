import { makeStyles } from "@material-ui/core";
import React from "react";
import ProductDisplayComponent from "../components/CategoriesPages/productDisplay";
import Footer from "../components/footer";
import { Navbar } from "../components/Navbar";

const useStyles = makeStyles({
  centerAlign: {
    textAlign: "center",
    marginTop: 64,
    "@media (max-width:660px)": {
      marginTop: 128,
    },
  },
});

const CategoriesProduct = () => {
  return (
    <div>
      <Navbar />
      <div>
        {/* <DrawerComponent /> */}
        <div>
          {/* <Typography className={classes.centerAlign} variant="h4">
            MEN
          </Typography> */}
        </div>
        <ProductDisplayComponent />
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesProduct;
