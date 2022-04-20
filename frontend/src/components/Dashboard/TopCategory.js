import { Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    bold : {
        fontWeight : 'bold',
    }
  }));
const TopCategoryComponent = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography className={classes.bold}>Top Categories</Typography>
        </div>
    );
}
 
export default TopCategoryComponent;