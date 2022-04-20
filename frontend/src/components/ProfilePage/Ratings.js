import { IoMdStar } from "react-icons/io";
import React, { useState } from "react";
import { makeStyles} from "@material-ui/core";
import {BsStarHalf,BsStarFill} from "react-icons/bs"
import { rating } from "../../redux/actions/profileAction";

const useStyles = makeStyles((theme) => ({
  container:{
    position:"relative",
    top:0,
    left:0,
    width:'100%',
    height:'fit-content',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  rate_text_btn:{
    position:'relative',
    top:0,
    left:0,
    width:'10)%',
    height:'fit-content',
    fontSize:'0.7rem',
    cursor:'pointer',
    textDecoration:'underline'
  },
  rating_info_cont:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:'fit-content',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
  },
  rating_div:{
    position:"relative",
    top:0,
    left:0,
    width:'100%',
    height:'fit-content',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start'
  },



}));
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function getRating(){
  //test rating variable , a req will be sent once backend is implemented
  let rating=Math.round(9);
  return rating
}

function Ratings() {
  
  const stars = Array(5).fill(0);
  const [rateValue, setRateValue] = useState(0);
  const [rating, setRating] = useState(false);
  const classes = useStyles();

  const handleClick = value => {
    setRateValue(value*2);
    //send rating data to backend inside this function -----
    setRating(false)
  };

  const handleMouseOver = newHoverValue => {
    setRateValue(newHoverValue*2);
  };

  const handleMouseLeave = () => {
    setRateValue(0);
  };

  const ratingClick = () =>{
    setRating(true);
  }

  return (
    <div className={classes.container}>
      <div onClick={()=>{ratingClick()}} className={classes.rate_text_btn}>
        <p>Rate this user</p>
      </div>
      <div className={classes.rating_info_cont}>
        <div style={styles.stars}>
          {rating ?
            <div className={classes.rating_div}>
              {stars.map((_, index) => {
                return (
                  <IoMdStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={() => handleMouseLeave()}
                    color={
                      (rateValue) >= ((index+1)*2)
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div> 
            : 
            <div className={classes.rating_div}>
              {stars.map((_, index) => {
                return (getRating() == (index*2+1) ?
                  <BsStarHalf 
                    key={index}
                    size={24}
                    color={
                      (getRating()) >= ((index*+1))
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                    }}
                  /> :
                  <IoMdStar
                    key={index}
                    size={24}
                    color={
                      (getRating()) >= ((index+1)*2)
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                    }}
                  />
                );
              })}
            </div>}
        </div>
        {/* add the number of users rated inside the span */}
        <div><span style={{
    marginLeft:10,whiteSpace:'nowrap',fontSize:'0.7rem'}}>1 review</span></div>
      </div>
      
      
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default Ratings;
