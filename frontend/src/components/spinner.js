import { Spinner } from "react-bootstrap"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
    mainContainer : {
        display : 'flex',
        height : '100vh',
        alignItems : 'center',
        justifyContent : 'center'
    },
    spinner : {
        height : "3rem",
        width : "3rem"
    }
})

const SpinnerComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
            <Spinner className={classes.spinner} animation="border" role="status" />
        </div>
    );
}
 
export default SpinnerComponent;