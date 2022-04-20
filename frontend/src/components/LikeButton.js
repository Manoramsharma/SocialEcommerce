import React, { useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { likeProduct, unlikeProduct } from "../redux/actions/productAction";
import { FiHeart } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  likesInfo: {
    position: "relative",
    top: 0,
    left: 0,
    width: "fit-content",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    fontSize: (props) => props.fontSize,
    zIndex: "3",
    "& p": {
      display: "flex",
      justifyContent: "center",
      fontSize: "0.4rem",
      margin: 0,
    },
    cursor: "pointer",
  },
}));

const LikeButton = (props) => {
  var propsD = {
    likesData: {},
    auth: {},
    id: "",
    fontSize: "1.2rem",
  };

  Object.assign(propsD, props);

  const classes = useStyles({ fontSize: propsD.fontSize });
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    propsD.likesData ? propsD.likesData.length : 0
  );

  
  useLayoutEffect(()=>{
    propsD.likesData &&
    propsD.likesData.forEach((like) => {
      if (propsD.auth.user) {
        if(like.username){
          if (like.username == propsD.auth.user.username) {
            !liked && setLiked(true);
          }
        }
        
      }
    });
  },[propsD.auth.user])

  const handleLike = () => {
    if (propsD.auth.user) {
      liked ? setLikes(likes - 1) : setLikes(likes + 1);
      liked
        ? dispatch(unlikeProduct({ id: propsD.id, auth: propsD.auth }))
        : dispatch(likeProduct({ id: propsD.id, auth: propsD.auth }));
      liked ? setLiked(false) : setLiked(true);
    }
  };

  return (
    <div onClick={handleLike} className={classes.likesInfo}>
      {liked ? <FiHeart fill="#ff2f2f" strokeWidth={0.5} /> : <FiHeart />}
      <p>{likes}</p>
    </div>
  );
};

export default LikeButton;
