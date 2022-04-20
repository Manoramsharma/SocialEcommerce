import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  InputBase,
  makeStyles,
  Badge,
  withStyles,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@material-ui/core";
import { Cancel, Search } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { logout } from "../../redux/actions/authAction";
import MenuIcon from "@material-ui/icons/Menu";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import { getDataAPI } from "../../utils/fetchData";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { deleteUnreadNotifications } from "../../redux/actions/profileAction";

const useStyles = makeStyles((theme) => ({
  // Search button styles starts here

  // search and input buttons for big screens
  inputDiv: {
    position: "relative",
    top: 0,
    left: 0,
    width: 320,
    "@media (max-width:1080px)": {
      width: (props) => (props.openup ? 320 : "28px"),
    },
    "@media (max-width:660px)": {
      transition: "width 0s ease-in",
      width: (props) => (props.openup ? "100%" : "0px"),
    },
    transition: "width 0.25s ease-in",
    paddingLeft: "0.4%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    marginRight: "4%",
  },
  searchInputContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: 320,
    "@media (max-width:1080px)": {
      width: (props) => (props.openup ? 320 : "28px"),
    },
    "@media (max-width:660px)": {
      height: "100%",
      transition: "width 0s ease-in",
      width: (props) => (props.openup ? "100%" : "0px"),
    },
    height: "60%",
    flexBasis: "100%",
    alignItems: "center",
    transition: "width 0.25s ease-in",
  },
  input: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#ffffff",
    border: "1px solid #dadada",
    paddingLeft: "0.4%",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: "60%",
    width: "100%",
    transition: "width 0.25s ease-in",
    "@media (max-width:1080px)": {
      border: (props) => (props.openup ? "1px solid black" : "none"),
      width: (props) => (props.openup ? 320 : "28px"),
      height: "60%",
      borderRadius: 10,
    },
    "@media (max-width:660px)": {
      height: "100%",
      width: (props) => (props.openup ? "100%" : "0px"),
      transition: "width 0s ease-in",
    },
  },
  inputBase: {
    width: 270,
    transition: "width 0.25s ease-in",
    "@media (max-width:1080px)": {
      width: (props) => (props.openup ? 270 : "0px"),
      marginLeft: (props) => (props.openup ? 20 : "0px"),
    },
    "@media (max-width:660px)": {
      transition: "width 0s ease-in",
      height: "100%",
      width: (props) => (props.openup ? "100%" : "0px"),
    },
    fontFamily: "SourceSansPro",
    marginLeft: 20,
    fontSize: "1rem",
    height: "60%",
  },
  searchBtn: {
    color: "#828282",
    position: "relative",
    top: 0,
    left: 0,
    width: "28px",
    "@media (max-width:660px)": {
      transition: "width 0s ease-in",
      width: (props) => (props.openup ? "28px" : "0px"),
    },
    height: 28,
  },
  closeBtn: {
    position: "relative",
    // display: "none",
    top: 0,
    left: 0,
    width: 24,
    height: 28,
    transition: "height 0.25s ease-in",
    "@media (max-width:1080px)": {
      height: (props) => (props.openup ? "28px" : "0px"),
    },
    "@media (max-width:660px)": {
      transition: "height 0s ease-in",
      height: 28,
    },
  },

  // search results div
  searchDiv: {
    position: "absolute",
    top: "80%",
    left: 0,
    width: "100%",
    minWidth: 150,
    display: (props) => (props.display ? "flex" : "none"),
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: "0 0 5px 5px",
    borderTop: "1px solid #000000 ",
  },
  searchResult: {
    position: "relative",
    top: "1em",
    wordWrap: "normal",
  },
  searchDivL: {
    position: "relative",
    top: 0,
    left: 0,
    padding: "10px",
    textAlign: "center",
    color: "#525252",
    transition: "background-color 0.5s ease-out",
    "&:hover": {
      backgroundColor: "#E2E1E1",
    },
  },

  // Navbar Without login styles starts here
  menuItemsWL: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navbar: {
    backgroundColor: "#F7F6F2",
    borderBottom: "1px solid #A9A9A9",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    maxWidth: 35,
  },
  buttonGroup: {
    height: "60%",
    width: "200px",
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    opcaity: 1,
    "@media (max-width: 660px)": {
      width: "120px",
    },
  },
  loginButton: {
    width: 100,
    padding: "3px 16px",
    whiteSpace: "no-wrap",
    "@media (max-width:660px)": {
      borderRadius: "5px !important",
    },
  },
  signupButton: {
    width: 100,
    padding: "3px 16px",
    whiteSpace: "no-wrap",
    "@media (max-width:660px)": {
      display: "none",
    },
  },
  loginBtn: {
    "@media (max-width: 330px)": {
      display: "none",
    },
  },
  menuIcon: {
    display: "none",
    "@media (max-width:660px)": {
      display: "block",
    },
    marginRight: "2%",
  },

  // styles for navbar menu icons on login

  roundedButton: {
    borderRadius: 100,
    height: 50,
    width: 50,
    minWidth: 30,
    "@media (max-width : 300px)": {
      width: "30px",
    },
  },
  profileButton: {
    width: 30,
    height: 30,
  },
  bellIcon: {
    color: "#E53F3F",
    width: 30,
  },
  buttonGroup_: {
    position: "relative",
    top: 0,
    left: 0,
    width: "240px",
    marginRight: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 600px)": {
      transition: "width 0.5s ease-in , opacity 0s ease-in 0.5s",
      width: "180px",
      overflow: "visible",
      opacity: "1",
    },
  },
  cartIcon: {
    "@media (max-width : 600px)": {
      display: "none",
    },
  },
  notiDisplay: {
    position: "absolute",
    display: (props) => (props.notiOpen ? "flex" : "none"),
    flexDirection: "column",
    backgroundColor: "#ffffff",
    width: 250,
    height: "fit-content",
    maxHeight: "300px",
    overflowY: "scroll",
    overflowX: "hidden",
    border: "1px solid #525252",
    borderTop: 0,
    borderRadius: "0 0 10px 10px",
    "@media (max-height : 300px)": {
      height: "200%",
      overflow: "scroll",
    },
    "@media (max-width : 250px)": {
      width: "100%",
    },
  },
  notiDisplayL: {
    position: "relative",
    top: 0,
    left: 0,
    padding: "10px",
    color: "#525252",
    transition: "background-color 0.5s ease-out",
    "&:hover": {
      backgroundColor: "#E2E1E1",
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  notiImage: {
    position: "relative",
    top: 0,
    left: 0,
    width: 80,
    alignSelf: "start",
    overflow: "hidden",
    "&:after": {
      display: "block",
      content: '" "',
      width: "100%",
      paddingTop: "100%",
    },
    "& img ": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  notiMsg: {
    position: "relative",
    top: 0,
    left: 0,
    width: 190,
    height: "fit-content",
    fontSize: "0.8rem",
  },
  profDisplay: {
    position: "absolute",
    display: (props) => (props.profileOpen ? "flex" : "none"),
    flexDirection: "column",
    backgroundColor: "#ffffff",
    width: "200px",
    height: "fit-content",
    border: "1px solid #525252",
    borderTop: 0,
    borderRadius: "0 0 10px 10px",
    "@media (max-height : 300px)": {
      height: "200%",
    },
    "@media (max-width : 200px)": {
      width: "100%",
    },
  },
  profDisplayL: {
    position: "relative",
    top: 0,
    left: 0,
    padding: "10px",
    textAlign: "center",
    color: "#525252",
    transition: "background-color 0.5s ease-out",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#E2E1E1",
    },
  },
  cartLink: {
    display: "none",
    "@media (max-width : 600px)": {
      display: "block",
    },
  },
  circleTest: {
    backgroundColor: "#886AFF",
    color: "white",
    height: 15,
    width: 15,
    position: "absolute",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4%",
    top: 12,
    right: 12,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

// <--------------------------Search Button divs start here --------------------------------------------------->
const SearchResults = (props) => {
  const classes = useStyles();
  return (
    <Link className={classes.searchDivL} to={props.link} style={{ textDecoration: "none" }}>
      {props.text}
    </Link>
  );
};
const searchAPI = async (value) => {
  const res = await getDataAPI(`/searchuser?name=${value}`);
  return res;
};
const SearchResultArea = (props) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    searchAPI(props.searchValue).then((data) => {
      setUsers(data.data.users);
      setProducts(data.data.products);
    });
  }, [props.searchValue]);

  const classes = useStyles({ display: props.display });
  const results = [
    { text: "You dont need a parachute to go skydiving", link: "/" },
    { text: "Ahh??", link: "/" },
    { text: "You just need it to go skydiving twice", link: "/" },
    { text: "hahah", link: "/" },
  ];
  return (
    <div className={classes.searchDiv}>
      {/* {users && (
        <>
          {users.map((item, i) => (
            <div key={i}>
              <Avatar
                className={classes.profileButton}
                sx={{ bgcolor: "##F39C12 " }}
                src={item.avatar}
              />
              <Link to={`/profile/${item.username}`}>
                <span>{item.fullname}</span>
              </Link>
            </div>
          ))}
        </>
      )} */}
      {products && (
        <>
          {products.map((item, i) => (
            <>
              <Avatar
                className={classes.profileButton}
                sx={{ bgcolor: "##F39C12 " }}
                src={item.images[0]}
              />
              <span>{item.productName}</span>
              <Avatar
                className={classes.profileButton}
                sx={{ bgcolor: "##F39C12 " }}
                src={item.user.avatar}
              />
              <Link to={`/profile/${item.user.username}`}>
                <span>{item.user.fullname}</span>
              </Link>
            </>
          ))}
        </>
      )}
    </div>
  );
};

function SearchDisplay(event, setdisplay) {
  event.target.value ? setdisplay(true) : setdisplay(false);
}

function handleSearchClose(match, setdisplay, setSearchValue, setOpenup) {
  setdisplay(false);
  setSearchValue("");
  setOpenup(false);
}
function handleSearchMClose(setdisplay, setSearchValue) {
  setdisplay(false);
  setSearchValue("");
}

export const SearchButtonM = () => {
  const [display, setdisplay] = useState(false);
  const openup = true;
  const classes = useStyles({ openup });
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down(960));
  const [searchValue, setSearchValue] = useState("");
  return (
    <div style={{ paddingLeft: 0 }} className={classes.inputDiv}>
      <div className={classes.searchInputContainer}>
        <div
          style={{ borderRadius: 0, border: "none", borderBottom: "1px solid #000000" }}
          className={classes.input}
        >
          <SearchIcon className={classes.searchBtn} color="#999999" />
          <InputBase
            placeholder="Search for product and more"
            className={classes.inputBase}
            onChange={(event) => {
              SearchDisplay(event, setdisplay);
              setSearchValue(event.target.value);
            }}
            value={searchValue}
          ></InputBase>
          <HighlightOffIcon
            onClick={() => {
              handleSearchMClose(setdisplay, setSearchValue);
            }}
            className={classes.closeBtn}
            color="#999999"
          />
        </div>
      </div>
      <SearchResultArea display={display} searchValue={searchValue} />
    </div>
  );
};

export const SearchButton = (props) => {
  const [openup, setOpenup] = useState(false);
  const [display, setdisplay] = useState(false);
  const classes = useStyles({ openup });
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down(960));
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={classes.inputDiv}>
      <div className={classes.searchInputContainer}>
        <div className={classes.input}>
          <SearchIcon
            className={classes.searchBtn}
            onClick={() => {
              setOpenup(true);
            }}
            color="#999999"
          />
          <InputBase
            placeholder="Search for product and more"
            className={classes.inputBase}
            onChange={(event) => {
              SearchDisplay(event, setdisplay);
              setSearchValue(event.target.value);
            }}
            value={searchValue}
          ></InputBase>
          <HighlightOffIcon
            onClick={() => {
              handleSearchClose(match, setdisplay, setSearchValue, setOpenup);
            }}
            className={classes.closeBtn}
            color="#999999"
          />
        </div>
      </div>
      <SearchResultArea display={display} searchValue={searchValue} />
    </div>
  );
};

// <--------------------------Search Button divs Ends here --------------------------------------------------->

// <--------------------------Menu Button Without login divs start here --------------------------------------------------->
export const MenuItemsWithoutLogin = (props) => {
  const [open, setOpen] = [props.open, props.setOpen];

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down(330));
  const classes = useStyles({ match: match });
  const history = useHistory();

  const loginButton = () => {
    history.push("/login");
  };
  const signUpButton = () => {
    history.push("/signup");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.menuItemsWL}>
      <ButtonGroup className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.signupButton}
          onClick={signUpButton}
        >
          SIGN UP
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={`${classes.loginButton} ${classes.loginBtn}`}
          onClick={loginButton}
        >
          LOGIN
        </Button>
      </ButtonGroup>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        className={classes.menuIcon}
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
};

// <--------------------------Menu Button Without login divs ends here --------------------------------------------------->

// <--------------------------Menu Button With login divs start here --------------------------------------------------->
function NotificationsDisplay() {
  const { auth } = useSelector((state) => state);

  const classes = useStyles();
  return (
    <div>
      {auth.user &&
        auth.user.notifications.map((item, index, array) => (
          <a href={array[array.length - 1 - index][0].url}>
            <div className={classes.notiDisplayL}>
              {array[array.length - 1 - index][0].userAvatar ? (
                <div style={{ width: 60 }} className={classes.notiImage}>
                  <img
                    style={{ borderRadius: "50%", overflow: "hidden" }}
                    src={array[array.length - 1 - index][0].userAvatar}
                  />
                </div>
              ) : (
                <p></p>
              )}
              {array[array.length - 1 - index][0].message ? (
                <div className={classes.notiMsg}>
                  <p>{array[array.length - 1 - index][0].message}</p>
                </div>
              ) : (
                <p></p>
              )}
              {array[array.length - 1 - index][0].postImg ? (
                <div className={classes.notiImage}>
                  <img src={array[array.length - 1 - index][0].postImg} />
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </a>
        ))}
    </div>
  );
}

function NotificationIconDisplay(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [notiLength, setNotiLength] = useState(
    auth.user ? auth.user.unreadnotifications.length : 0
  );
  const handleUnreadNotilength = () => {
    props.notiOpen ? props.setNotiOpen(false) : props.setNotiOpen(true);
    props.setProfileOpen(false);
    dispatch(deleteUnreadNotifications({ auth }));
    setNotiLength(0);
  };

  const classes = useStyles();

  return (
    <Button
      ref={props.notiref}
      onClick={() => {
        /*  notiOpen ? setNotiOpen(false) : setNotiOpen(true);
      setProfileOpen(false); */

        handleUnreadNotilength();
      }}
      className={classes.roundedButton}
    >
      {notiLength === 0 ? (
        <svg
          width="21"
          height="23"
          viewBox="0 0 21 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 0C5.7979 -2.50339e-06 1.98635 3.58259 1.98635 8.00074V10.8268L0.517776 14.6907C0.358121 15.1107 0.218658 15.4776 0.129185 15.7841C0.0366496 16.1012 -0.0359817 16.458 0.0190553 16.8375C0.135872 17.6431 0.662248 18.345 1.43029 18.7193C1.79214 18.8956 2.1742 18.9514 2.52305 18.9761C2.86037 19 3.27499 19 3.74963 19L6.24317 19C6.24317 21.2091 8.14901 23 10.5 23C12.851 23 14.7568 21.2091 14.7568 19L17.2503 19C17.725 19 18.1396 19 18.4769 18.9761C18.8258 18.9514 19.2079 18.8956 19.5697 18.7193C20.3378 18.345 20.8641 17.6431 20.9809 16.8375C21.036 16.458 20.9634 16.1012 20.8708 15.7841C20.7813 15.4776 20.6419 15.1107 20.4822 14.6906L19.0137 10.8268V8.00074C19.0137 3.5826 15.2021 2.5034e-06 10.5 0ZM12.6284 19H8.37158C8.37158 20.1046 9.3245 21 10.5 21C11.6755 21 12.6284 20.1046 12.6284 19ZM17.2122 17C17.7362 17 18.0694 16.9993 18.3167 16.9818C18.5178 16.9675 18.5837 16.9458 18.5919 16.9428C18.7443 16.8677 18.8488 16.7279 18.872 16.5675C18.8696 16.5845 18.8832 16.5357 18.8182 16.3131C18.7526 16.0883 18.6412 15.7933 18.465 15.3296L16.9556 11.3584C16.9121 11.2438 16.8852 11.1159 16.8852 10.9776V8.00074C16.8852 4.68689 14.0263 2 10.5 2C6.97368 2 4.11476 4.68689 4.11476 8.00074V10.9776C4.11476 11.1159 4.08792 11.2438 4.04437 11.3584L2.53504 15.3296C2.35879 15.7933 2.24741 16.0883 2.1818 16.3131C2.12846 16.4959 2.1281 16.5615 2.1283 16.5697C2.15219 16.7292 2.25636 16.8681 2.40813 16.9428C2.41626 16.9458 2.48214 16.9675 2.68325 16.9818C2.93063 16.9993 3.26378 17 3.7878 17H17.2122Z"
            fill="#333333"
          />
        </svg>
      ) : (
        <div>
          <svg
            width="27"
            height="26"
            viewBox="0 0 27 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.8218 16.6373L18.465 18.3296C18.6412 18.7933 18.7526 19.0883 18.8182 19.3131C18.8832 19.5357 18.8696 19.5845 18.872 19.5675C18.8488 19.7279 18.7443 19.8677 18.5919 19.9428C18.5837 19.9458 18.5178 19.9675 18.3167 19.9818C18.0694 19.9993 17.7362 20 17.2122 20H3.7878C3.26378 20 2.93063 19.9993 2.68325 19.9818C2.48214 19.9675 2.41626 19.9458 2.40813 19.9428C2.25636 19.8681 2.15219 19.7292 2.1283 19.5697C2.1281 19.5615 2.12846 19.4959 2.1818 19.3131C2.24741 19.0883 2.35879 18.7933 2.53504 18.3296L4.04437 14.3584C4.08792 14.2438 4.11476 14.1159 4.11476 13.9776V11.0007C4.11476 7.68689 6.97368 5 10.5 5C10.5667 5 10.6332 5.00096 10.6995 5.00287C10.838 4.31948 11.0462 3.66138 11.3163 3.03631C11.0477 3.01229 10.7754 3 10.5 3C5.7979 3 1.98635 6.58259 1.98635 11.0007V13.8268L0.517776 17.6907C0.358121 18.1107 0.218658 18.4776 0.129185 18.7841C0.0366496 19.1012 -0.0359817 19.458 0.0190553 19.8375C0.135872 20.6431 0.662248 21.345 1.43029 21.7193C1.79214 21.8956 2.1742 21.9514 2.52305 21.9761C2.86037 22 3.27498 22 3.74962 22H3.74963L6.24317 22C6.24317 24.2091 8.14901 26 10.5 26C12.851 26 14.7568 24.2091 14.7568 22L17.2503 22H17.2504C17.725 22 18.1396 22 18.4769 21.9761C18.8258 21.9514 19.2079 21.8956 19.5697 21.7193C20.3378 21.345 20.8641 20.6431 20.9809 19.8375C21.036 19.458 20.9634 19.1012 20.8708 18.7841C20.7813 18.4776 20.6419 18.1107 20.4822 17.6906L20.2182 16.9961C19.3903 16.9732 18.5876 16.8497 17.8218 16.6373ZM10.5 24C9.3245 24 8.37158 23.1046 8.37158 22H12.6284C12.6284 23.1046 11.6755 24 10.5 24Z"
              fill="#333333"
            />
            <circle cx="19.5" cy="7.5" r="7.5" fill="#F40000" />
          </svg>
          <div className={classes.circleTest}>{notiLength}</div>
        </div>
      )}
    </Button>
  );
}

export const MenuItemsWithLogin = (props) => {
  const [profPosition, setProfPosition] = useState({ top: 0, left: 0 });
  const [notiPosition, setNotiPosition] = useState({ top: 0, left: 0 });
  const [profileOpen, setProfileOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);

  const profileReference = useRef();
  const NotificationReference = useRef();
  const parentReference = useRef();

  const classes = useStyles({
    profileOpen: profileOpen,
    notiOpen: notiOpen,
  });
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const { pathname } = useLocation();
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(auth.user);
  }, [auth.user]);

  useEffect(() => {
    function updateProfileDrodownPosition() {
      if (parentReference && parentReference.current) {
        let profileLeft, profileTop;
        if (profileReference && profileReference.current) {
          profileLeft =
            profileReference.current.getBoundingClientRect().left -
            parentReference.current.getBoundingClientRect().left;
          profileTop = profileReference.current.getBoundingClientRect().top + 57;
        }

        let spaceForDiv = window.innerWidth - profileLeft;
        if (spaceForDiv <= 200 && window.innerWidth >= 200) {
          setProfPosition({
            top: profileTop,
            left: profileLeft - (200 - spaceForDiv) - 20,
          });
        } else if (window.innerWidth >= 200) {
          setProfPosition({ top: profileTop, left: profileLeft - 80 });
        } else if (window.innerWidth <= 200) {
          setProfPosition({ top: profileTop, left: 0 });
        }
      }
    }
    function updateNotificationDropdownPosition() {
      let notiLeft, notiTop;
      if (NotificationReference && NotificationReference.current) {
        notiLeft =
          NotificationReference.current.getBoundingClientRect().left -
          parentReference.current.getBoundingClientRect().left;
        notiTop = NotificationReference.current.getBoundingClientRect().top + 57;
      }

      let spaceForDiv = window.innerWidth - notiLeft;
      if (spaceForDiv <= 250 && window.innerWidth >= 250) {
        setNotiPosition({
          top: notiTop,
          left: notiLeft - (250 - spaceForDiv) - 20,
        });
      } else if (window.innerWidth >= 300) {
        setNotiPosition({ top: notiTop, left: notiLeft - 60 });
      } else if (window.innerWidth <= 300) {
        setNotiPosition({ top: notiTop, left: 0 });
      }
    }
    let resizeTimer = setTimeout(() => {
      updateNotificationDropdownPosition();
      updateProfileDrodownPosition();
    }, 500);
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateNotificationDropdownPosition();
        updateProfileDrodownPosition();
      }, 500);
    });

    return () =>
      window.removeEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          updateNotificationDropdownPosition();
          updateProfileDrodownPosition();
        }, 500);
      });
  }, [window.innerWidth]);

  return (
    <div ref={parentReference} variant="text" className={classes.buttonGroup_}>
      <NotificationIconDisplay
        setNotiOpen={setNotiOpen}
        setProfileOpen={setProfileOpen}
        notiOpen={notiOpen}
        notiref={NotificationReference}
      />
      <Button
        onClick={() => {
          profileOpen ? setProfileOpen(false) : setProfileOpen(true);
          setNotiOpen(false);
        }}
        ref={profileReference}
        className={`${classes.roundedButton}`}
      >
        {values.avatar ? (
          <Avatar className={classes.profileButton} alt="Remy Sharp" src={values.avatar} />
        ) : (
          <Avatar className={classes.profileButton} sx={{ bgcolor: "##F39C12 " }}>
            {auth.user.fullname[0]}
          </Avatar>
        )}
      </Button>
      <Button className={classes.roundedButton}>
        <svg
          width="27"
          height="23"
          viewBox="0 0 27 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="7.5" y="0.5" width="12" height="22" fill="white" stroke="black" />
          <rect x="21.5" y="4.5" width="5" height="15" fill="#0A0A0A" stroke="black" />
          <rect x="0.5" y="4.5" width="5" height="15" fill="#0A0A0A" stroke="black" />
        </svg>
      </Button>
      <IconButton aria-label="cart" className={classes.cartIcon}>
        <Link to={"/cart"}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.4997 2C10.4294 2 8.08995 4.265 8.08995 6.88235V7.35294H18.9094V6.88235C18.9094 4.265 16.5699 2 13.4997 2ZM20.9094 7.35294V6.88235C20.9094 3.00224 17.5094 0 13.4997 0C9.48995 0 6.08995 3.00224 6.08995 6.88235V7.35294H5.42572C3.33127 7.35294 1.45711 8.82605 1.24063 10.912L0.0197342 22.6768C-0.23015 25.0847 1.81737 27 4.20482 27H22.7945C25.182 27 27.2295 25.0847 26.9796 22.6768L25.7587 10.912C25.5422 8.82605 23.6681 7.35294 21.5736 7.35294H20.9094ZM5.42572 9.35294C4.21558 9.35294 3.32678 10.1855 3.22995 11.1185L2.00905 22.8832C1.90055 23.9287 2.81218 25 4.20482 25H22.7945C24.1872 25 25.0988 23.9287 24.9903 22.8832L23.7694 11.1185C23.6726 10.1855 22.7838 9.35294 21.5736 9.35294H5.42572ZM7.08995 11.7647C7.64223 11.7647 8.08995 12.2124 8.08995 12.7647V12.7794C8.08995 13.3317 7.64223 13.7794 7.08995 13.7794C6.53767 13.7794 6.08995 13.3317 6.08995 12.7794V12.7647C6.08995 12.2124 6.53767 11.7647 7.08995 11.7647ZM19.9094 11.7647C20.4617 11.7647 20.9094 12.2124 20.9094 12.7647V12.7794C20.9094 13.3317 20.4617 13.7794 19.9094 13.7794C19.3571 13.7794 18.9094 13.3317 18.9094 12.7794V12.7647C18.9094 12.2124 19.3571 11.7647 19.9094 11.7647Z"
              fill="#333333"
            />
          </svg>
        </Link>
      </IconButton>

      <div
        style={{ top: notiPosition.top, left: notiPosition.left }}
        className={classes.notiDisplay}
      >
        <NotificationsDisplay />
      </div>
      <div
        style={{ top: profPosition.top, left: profPosition.left }}
        className={classes.profDisplay}
      >
        <Link
          className={classes.profDisplayL}
          to={"/profile/" + values.username}
          style={{ textDecoration: "none" }}
        >
          My Profile
        </Link>
        {values.isSeller ? (
          <>
            <Link
              className={classes.profDisplayL}
              to={"/uploadproduct"}
              style={{ textDecoration: "none" }}
            >
              Upload Product
            </Link>
            <Link
              className={classes.profDisplayL}
              to={"/dashboard"}
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </>
        ) : (
          <Link
            className={classes.profDisplayL}
            to={"/sellonsarvh"}
            style={{ textDecoration: "none" }}
          >
            Sell On Sarvh
          </Link>
        )}
        <Link
          className={classes.profDisplayL}
          to={"/editprofile"}
          style={{ textDecoration: "none" }}
        >
          Edit profile
        </Link>
        <Link
          className={`${classes.profDisplayL} ${classes.cartLink}`}
          to={"/cart"}
          style={{ textDecoration: "none" }}
        >
          My Cart
        </Link>
        <div className="dropdown-divider"></div>
        <Link
          className={classes.profDisplayL}
          style={{ textDecoration: "none" }}
          onClick={() => dispatch(logout())}
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};
