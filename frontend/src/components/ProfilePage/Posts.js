import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../cards";

const useStyles = makeStyles((theme) => ({
  displayDiv: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "2%",
  },
  categoriesContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
  },
  inputsContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
  },
  categoryInput: {
    position: "relative",
    top: 0,
    left: 0,
    width: "25%",
    height: "fit-content",
    alignItems: "center",
    textAlign: "center",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",

    "&:focus": {
      outline: "none",
    },
  },
  toggleButtonGroup: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  subHeadings: {
    fontSize: "1rem",
    "@media (max-width:660px)": {
      fontSize: "0.9rem",
    },
    "@media (max-width:540px)": {
      fontSize: "0.7rem",
    },
    "& input": {
      fontSize: "1rem",
      "@media (max-width:660px)": {
        fontSize: "0.9rem",
      },
      "@media (max-width:540px)": {
        fontSize: "0.7rem",
      },
    },
  },
  mainContainer: {
    position: "relative",
    top: 0,
    left: 0,
    display: "grid",
    gridTemplateColumns: "32% 32% 32%",
    "@media (min-width:1024px)": {
      fontSize: "0.9rem",
      gridTemplateColumns: "24% 24% 24% 24%",
    },
    "@media (max-width:500px)": {
      fontSize: "0.9rem",
      gridTemplateColumns: "50% 50%",
    },
    gap: "0.7% 1%",
    "@media (max-width:700px)": {
      gap: "0 0",
    },
    marginTop: "2%",
    justifyContent: "center",
  },
  media: {
    height: 350,
  },
  cardContainer: {
    width: "100%",
    padding: "3%",
  },

  strikeThrough: {
    textDecorationLine: "line-through",
  },
  itemContainer: {
    textAlign: "center",
    height: 300,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarContainer: {
    marginTop: 100,
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    width: "50%",
    justifyContent: "space-around",
  },
  left: {
    display: "flex",
    width: "30%",
    justifyContent: "space-around",
  },
  fontSize: {
    fontSize: "1rem",
  },
  bold: {
    fontWeight: "bold",
  },
  followersDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  right: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
  },
  right2: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
  nonSellerCont: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
  },
}));
const Posts = () => {
  const [button, setButton] = useState("");
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const { id } = useParams();
  const [focus, setfocus] = useState(true);

  useEffect(() => {
    try {
      function filter_data(product) {
        var newData = product.filter((temp) => temp.user.username === id);
        setUserData(newData);
        setFilterData(newData);
      }
      profile.product.forEach(filter_data);
    } catch (err) {
      /*  console.log(err); */
    }
  }, [auth, profile.product, dispatch, id]);
  // function handleFormat(event, newFormats) {
  //   if (event === "All") {
  //     setFilterData(userData);
  //   } else {
  //     const newData = userData.filter(temp => temp.category === event);

  //     setFilterData(newData);
  //   }
  // }
  function handleInputChange(e) {
    setfocus(false);

    e.target.offsetParent.childNodes.forEach((ele) => {
      ele.style.borderBottom = "none";
    });
    e.target.style.borderBottom = "3px solid #9ecaed";

    if (e.target.defaultValue === "All") {
      setFilterData(userData);
    } else {
      const newData = userData.filter((temp) => temp.category === e.target.defaultValue);

      setFilterData(newData);
    }
  }
  const classes = useStyles({ focus });
  return profile.users[0] ? (
    profile.users[0].isSeller ? (
      <div className={classes.displayDiv}>
        <div className={classes.categoriesContainer}>
          <div className={classes.inputsContainer}>
            <input
              style={focus ? { borderBottom: "3px solid #9ecaed" } : { borderBottom: "none" }}
              className={classes.categoryInput}
              onClick={(e) => {
                handleInputChange(e);
              }}
              value="All"
              readonly="readonly"
            ></input>
            <input
              className={classes.categoryInput}
              onClick={(e) => {
                handleInputChange(e);
              }}
              value="Men"
              readonly="readonly"
            />
            <input
              className={classes.categoryInput}
              onClick={(e) => {
                handleInputChange(e);
              }}
              value="Women"
              readonly="readonly"
            />
            <input
              className={classes.categoryInput}
              onClick={(e) => {
                handleInputChange(e);
              }}
              value="Accessories"
              readonly="readonly"
            />
          </div>
          {/* <ToggleButtonGroup
            className={classes.toggleButtonGroup}
            type="radio"
            name="options"
            value={button}
            radioDisplay={false}
            onChange={handleFormat}
          >
            <ToggleButton className={classes.subHeadings} id="tbg-radio-1" value="All">
              ALL
            </ToggleButton>
            <ToggleButton className={classes.subHeadings} id="tbg-radio-2" value="Men">
              MEN
            </ToggleButton>
            <ToggleButton className={classes.subHeadings} id="tbg-radio-3" value="Women">
              WOMEN
            </ToggleButton>
            <ToggleButton className={classes.subHeadings} id="tbg-radio-4" value="Accessories">
              ACCESSORIES
            </ToggleButton>
          </ToggleButtonGroup> */}
        </div>

        <div className={classes.mainContainer}>
          {filterData.map((data) => (
            <div className={classes.postCards}>
              <Card
                to={"/buyproduct/" + data._id + "/"}
                username={profile.users[0].fullname}
                avatar={profile.users[0].avatar}
                data={data}
                carouselImgs={{
                  display: true,
                  arrows: false,
                  dots: true,
                  swipe: true,
                  autoSlide: false,
                }}
                post={true}
              />
              {/* <Carousel className={classes.carouselContainer}>
                {user.images.map(image => (
                  <Carousel.Item className={classes.itemContainer}>
                    <Link
                      to={"/buyproduct/" + user._id}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.productImage}
                        src={image}
                        alt={"productimage"}
                      ></img>
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>

              <div>Product Name: {user.productName}</div>
              <div>Price: {user.price}</div>
              <div>Description: {user.productDescription}</div>
              <div>Features: {user.productFeatures}</div> */}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className={classes.nonSellerCont}>
        <p>This is not a Sellers Profile</p>
      </div>
    )
  ) : (
    <p></p>
  );
};

export default Posts;
