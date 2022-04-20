import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profileAction";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
  },
  subHeadings: {
    fontSize: "1rem",
    "@media (max-width:660px)": {
      fontSize: "0.9rem",
    },
    "@media (max-width:540px)": {
      fontSize: "0.7rem",
    },
  },
}));

const Followbtn = ({ user }) => {
  const classes = useStyles();
  const [followed, setFollowed] = useState(false);
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user && auth.user.following.find((item) => item.username === user.username)) {
      setFollowed(true);
    }
  }, [auth.user, profile.user]);
  const handlefollow = () => {
    if (auth.user) {
      setFollowed(true);
      dispatch(follow({ users: profile.users, user, auth }));
    }
  };
  const handleUnfollow = () => {
    if (auth.user) {
      setFollowed(false);
      dispatch(unfollow({ users: profile.users, user, auth }));
    }
  };

  return (
    <div className={`${classes.subHeadings} ${classes.btn}`}>
      {followed ? (
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ width: "100%" }}
          className={classes.subHeading}
          onClick={handleUnfollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ width: "100%" }}
          className={classes.subHeading}
          onClick={handlefollow}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default Followbtn;
