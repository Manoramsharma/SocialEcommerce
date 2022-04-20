import {makeStyles, Typography}  from '@material-ui/core';
const image = "https://cdn.shopify.com/s/files/1/1002/7150/products/New-Mockups---no-hanger---TShirt-Man-with-a-plan---prof.jpg?v=1627906686";
const useStyles = makeStyles({
    mainContainer: {
        width : "100vw",
        backgroundColor : "grey",
        height : 120,
        marginTop : 64,
        display : "flex",
        justifyContent : "space-evenly",
        alignItems : "center"
    },
    categoryDiv : {
        height : "80%",
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "space-between"

    },
    image : {
        height : "70%",
        width : "auto",
        borderRadius : "50%"
    },
    bold : {
        fontWeight : "bold",
    }
})

const CategoriesComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
            <div className={classes.categoryDiv}>
                <img className={classes.image} src={image} />
                <Typography className={classes.bold}>Shirt</Typography>
            </div>
            <div className={classes.categoryDiv}>
                <img className={classes.image} src={image} />
                <Typography className={classes.bold}>Shirt</Typography>
            </div>
            <div className={classes.categoryDiv}>
                <img className={classes.image} src={image} />
                <Typography className={classes.bold}>Shirt</Typography>
            </div>
            <div className={classes.categoryDiv}>
                <img className={classes.image} src={image} />
                <Typography className={classes.bold}>Shirt</Typography>
            </div>
            <div className={classes.categoryDiv}>
                <img className={classes.image} src={image} />
                <Typography className={classes.bold}>Shirt</Typography>
            </div>
        </div>
    );
}
 
export default CategoriesComponent;