import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SearchButton,
  SearchButtonM,
  MenuItemsWithoutLogin,
  MenuItemsWithLogin,
} from "./homePage/navbarMenuItems";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import GradeIcon from "@material-ui/icons/Grade";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import InfoIcon from "@material-ui/icons/Info";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 64,
    width: "100%",
  },
  navbar: {
    boxShadow: "0px -6px 20px -5px rgba(85,85,85,0.74)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 64,
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    backgroundColor: "#F6F9FF",
    // borderBottom: "1px solid #999999",
  },
  left: {
    position: "relative",
    top: 0,
    left: 0,
    width: "fit-content",
    height: 64,
    display: "flex",
    flexDirection: "row",
    zIndex: "2",
  },
  right: {
    position: "relative",
    top: 0,
    left: 0,
    width: 570,
    "@media (max-width:1080px)": {
      width: 270,
    },
    "@media (max-width:660px)": {
      width: 310,
    },
    "@media (max-width:440px)": {
      width: 200,
    },
    height: 64,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: "2",
  },
  logo: {
    zIndex: 3,
    position: "relative",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    marginLeft: 10,
    height: "fit-content",
    width: "110px",
    "@media (max-width:440px)": {
      width: 70,
    },
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
    },
  },
  categories: {
    position: "relative",
    top: 0,
    left: 0,
    width: "440px",
    overflow: "visible",
    fontSize: "0.9rem",
    "@media (max-width:1080px)": {
      overflow: "hidden",
      width: (props) => (props.openup ? 0 : 440),
      // overflow:(props) => props.openup ? 'hidden' : 'visible',
    },
    "@media (max-width:810px)": {
      overflow: "hidden",
      width: (props) => (props.openup ? 0 : 280),
      // overflow:(props) => props.openup ? 'hidden' : 'visible',
    },
    "@media (max-width:660px)": {
      display: "none",
    },
    transition: "width 0.25s ease-in",
    height: 64,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    listStyleType: "none",
    padding: 0,
    marginLeft: "6%",
    "& li": {
      position: "relative",
      top: 0,
      left: 0,
      width: "fit-content",
      padding: "5%",
      whiteSpace: "nowrap",

      "&:hover": {
        borderBottom: "3px solid #9ecaed",
      },
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  searchBtn: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    left: 0,
    width: "auto",
    height: 28,
  },
  searchButtonM: {
    position: "fixed",
    top: 64,
    transition: "top 0.25s ease-in",
    left: 0,
    width: "100%",
    height: 50,
    zIndex: 10,
  },
  links: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export const Navbar = () => {
  const { auth } = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [values, setValues] = useState({
    username: "sarvhuser",
  });
  useLayoutEffect(() => {
    try {
      setValues({ ...values, username: auth.user.username });
    } catch (error) {
      /*  console.log(error); */
    }
  }, [auth.user]);

  const theme = useTheme();
  let match = useMediaQuery("(max-width:660px");
  let match2 = useMediaQuery("(max-width:810px");
  return (
    <div>
      <AppBar position="fixed" elevation={0} style={{ zIndex: 1150 }} className={classes.appBar}>
        <Toolbar className={classes.navbar}>
          <div className={classes.left}>
            <Link className={classes.logo} style={{ zIndex: 5 }} to="/">
              <img src={logo} alt="logo" />
            </Link>
            <ul className={classes.categories}>
              <li>Men</li>
              <li>Women</li>
              {!match2 && <li>{"Home & Decor"}</li>}

              <li>Others</li>
            </ul>
          </div>
          <div className={classes.right}>
            {match ? <></> : <SearchButton style={{ zIndex: 3 }} />}
            {auth.token ? (
              <MenuItemsWithLogin style={{ zIndex: 1 }} />
            ) : (
              <MenuItemsWithoutLogin style={{ zIndex: 1 }} open={open} setOpen={setOpen} />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.searchButtonM}>
        {match ? <SearchButtonM style={{ zIndex: 3 }} /> : <></>}
      </div>
      {/*---------------- Drawer menu ------------------------*/}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {["Men", "Women", "Accessories"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <GradeIcon /> : <StarOutlineIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <Link className={classes.links} to="/bycategories?category=Men">
            <ListItem button key="Men">
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Men" />
            </ListItem>
          </Link>
          <Link className={classes.links} to="/bycategories?category=Women">
            <ListItem button key="Women">
              <ListItemIcon>
                <StarOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Women" />
            </ListItem>
          </Link>
          <Link className={classes.links} to="/bycategories?category=Accessories">
            <ListItem button key="Accessories">
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Accessories" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {["Contact Us", "About"].map((text, index) => (
            <Link className={classes.links} to={index % 2 === 0 ? `/contactus` : `/about`}>
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <ContactsOutlinedIcon /> : <InfoIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
