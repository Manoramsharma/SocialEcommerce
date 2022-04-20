import React, { useState, useEffect } from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import { useSelector, useDispatch } from "react-redux";
import Followbtn from "./Followbtn";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { IoMdStar } from "react-icons/io";
import Ratings from "./Ratings";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
  },
  avatarContainer: {
    marginTop: "4%",
    paddingBottom: "4%",
    position: "relative",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-around",
  },
  profileFollowCont: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    "@media (max-width:400px)": {
      flexDirection: "column",
    },
    justifyContent: "space-between",
  },
  left: {
    position: "relative",
    top: 0,
    left: 0,
    width: "60%",
    "@media (max-width:400px)": {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profilePic: {
    position: "relative",
    top: 0,
    left: 0,
    width: "25%",
    maxWidth: "104px",
    alignSelf: "start",
    "&:after": {
      display: "block",
      content: '" "',
      width: "100%",
      paddingTop: "100%",
    },
  },
  large: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  userInfo: {
    position: "relative",
    top: 0,
    left: 0,
    width: "65%",
    "@media (max-width:400px)": {
      width: "fit-content",
    },
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    marginLeft: "4%",
    justifyContent: "flex-start",
  },
  userName: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  right: {
    position: "relative",
    top: 0,
    left: 0,
    width: "40%",
    "@media (max-width:400px)": {
      width: "100%",
      marginTop: "4%",
    },
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  right2: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  followersDiv: {
    position: "relative",
    top: 0,
    left: 0,
    width: "40%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10%",
  },
  displayDiv: {
    padding: "2%",
  },
  toggleButtonGroup: {
    marginTop: 100,
    width: "70%",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  btn: {
    width: "100%",
  },
  headings: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    "@media (max-width:660px)": {
      fontSize: "1rem",
    },
    "@media (max-width:540px)": {
      fontSize: "0.8rem",
    },
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
  bioContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    marginTop: "2%",
  },

  paper: {
    position: "absolute",
    width: "40%",
    height: "30%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Info = ({ id: id, setDisplayList: setDisplayList, setdataList: setdataList }) => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(2);
  const classes = useStyles();
  const [userData, setUserData] = useState([]);

  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isEmptyObject(auth)) {
      try {
        const newData = profile.users.filter((user) => user.username === id);
        setUserData(newData[0]);
      } catch (err) {
        /*  console.log(err); */
      }
    } else {
      if (auth.user.username === id) {
        setUserData(auth.user);
      } else {
        try {
          const newData = profile.users.filter((user) => user.username === id);
          setUserData(newData[0]);
        } catch (err) {
          /*  console.log(err); */
        }
      }
    }
  }, [auth, profile.users, dispatch, id]);
  function body(values) {
    return (
      <div style={modalStyle} className={classes.paper}>
        {values.map((item, i) => (
          <div key={i}>
            <span>
              <Avatar src={item.avatar} alt="profile image" className={classes.large} />
            </span>
            <span>{item.fullname}</span>
            <Link to={"/profile/" + item.username} style={{ textDecoration: "none" }}>
              <span>{item.username}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={classes.profileContainer}>
      {userData && userData.followers && userData.following && (
        <div className={classes.avatarContainer}>
          <div className={classes.profileFollowCont}>
            <div className={classes.left}>
              <div className={classes.profilePic}>
                <Avatar src={userData.avatar} alt="profile image" className={classes.large} />
              </div>
              <div className={classes.userInfo}>
                <Typography className={classes.headings}>{userData.fullname}</Typography>
                <Typography
                  color="textSecondary"
                  className={`${classes.subHeadings}  ${classes.userName}`}
                >
                  {userData.username}
                </Typography>

                {/* add rattings over here. responsiveness will be handled */}
                <Ratings />
              </div>
            </div>
            <div className={classes.right}>
              <div className={classes.right2}>
                <div
                  onClick={() => {
                    setdataList({ name: "Followers", userData: userData.followers });
                    setDisplayList(true);
                  }}
                  className={classes.followersDiv}
                >
                  <Typography className={classes.subHeadings}>
                    {userData.followers.length}
                  </Typography>

                  <Button className={classes.subHeadings}>Followers</Button>
                  <Modal
                    className={classes.modaldiv}
                    open={followersOpen}
                    onClose={() => {
                      setFollowersOpen(false);
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body(userData.followers)}
                  </Modal>
                </div>
                <div
                  onClick={() => {
                    setdataList({ name: "Following", userData: userData.following });
                    setDisplayList(true);
                  }}
                  className={classes.followersDiv}
                >
                  <Typography className={classes.subHeadings}>
                    {userData.following.length}
                  </Typography>
                  <Button className={classes.subHeadings}>Following</Button>
                  <Modal
                    open={followingOpen}
                    onClose={() => {
                      setFollowingOpen(false);
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body(userData.following)}
                  </Modal>
                </div>
              </div>
              {/* logged in  */}
              {!isEmptyObject(auth) && (
                <>
                  {userData.username === auth.user.username ? (
                    <Link to={"/editprofile/"} style={{ textDecoration: "none" }}>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        className={`${classes.subHeadings} ${classes.btn}`}
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  ) : (
                    <Followbtn user={userData}></Followbtn>
                  )}
                </>
              )}
              {isEmptyObject(auth) && <div></div>}
            </div>
          </div>
          <div className={`${classes.bioContainer} ${classes.subHeadings}`}>
            <p>{userData.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Info;
