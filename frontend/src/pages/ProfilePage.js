import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles ,Avatar } from "@material-ui/core";
import Info from "../components/ProfilePage/Info";
import Posts from "../components/ProfilePage/Posts";
import { useParams } from "react-router";
import { getProfileUsers } from "../redux/actions/profileAction";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Navbar } from "../components/Navbar";
import CloseIcon from '@material-ui/icons/Close';
import Followbtn from "../components/ProfilePage/Followbtn";

const useStyles = makeStyles(theme => ({
  root:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
  },
  profileContainer:{
    position:'absolute',
    top:64,
    "@media (max-width:660px)":{
      top:128,
    },
    left:'50%',
    transform:'translateX(-50%)',
    width:'80%',
    '@media (max-width:769px)':{
      width:'100%'
    },
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    zIndex:1,
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
  toggleButtonGroup: {
    marginTop: 100,
    width: "70%",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  displayDiv: {
    padding: "2%",
  },

  // styles for following list modal -------------------------------

  displayList:{
    position:'fixed',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    zIndex:1500,
    display: (props) => (props.displayList ? 'block' : 'none'),
  },
  background:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    backgroundColor:'#000000',
    opacity:'50%',
    zIndex:1,
  },
  listContainer:{
    position:'absolute',
    top:'50%',
    left:'50%',
    width:'60%',
    "@media (max-width:600px)":{
      width:'80%'
    },
    "@media (max-width:450px)":{
      width:'100%'
    },
    maxWidth:'400px',
    height:'80%',
    transform:'translateX(-50%) translateY(-50%)',
    backgroundColor:'#ffffff',
    zIndex:2,
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    borderRadius:'15px'
  },
  listheading:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:64,
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    padding:'5%',
    zIndex:'4',
    borderBottom:'1px solid black',
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    '& p':{
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%) translateY(-50%)'
    }
  },
  listItems:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    zIndex:'2',
    paddingTop:64,
    overflowX:'hidden',
    overflowY:'scroll',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  userInfo:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:'fit-content',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:'3%'
  },
  profilePic:{
    position:'relative',
    top:0,
    left:0,
    width: '12%',
    height:'fit-content',
    maxWidth:'104px',
    '&:after':{
      display:'block',
      content:'" "',
      width:'100%',
      paddingTop:'100%'
    }
  },
  large: {
    position:'absolute',
    top:0,
    left:0,
    width: '100%',
    height: '100%',
  },
  userDetails:{
    position:'relative',
    top:0,
    left:0,
    width:'58%',
    height:'fit-content',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    paddingLeft:'3%',
    '& p':{
      width:'100%',
      maxWidth:'100%',
      overflow: 'hidden',
      whiteSpace:'nowrap',
      textOverflow:'ellipsis',
    }
  },
  userFollowBtn:{
    position:'relative',
    top:0,
    left:0,
    width:'30%',
    height:'fit-content'
  },

  subHeadings:{
    fontSize: "1.3rem",
    '@media (max-width:660px)':{
      fontSize: "1.1rem",
    },
    '@media (max-width:540px)':{
      fontSize: "1rem",
    }
  },
  fullName:{
    margin:0,
    fontSize: "0.8rem",
    
    '@media (max-width:540px)':{
      fontSize: "0.8rem",
    }
  },
  userName:{
    margin:0,
    fontSize: "0.7rem",
    
    '@media (max-width:540px)':{
      fontSize: "0.7rem",
    }
  },
}));

const DisplayList = (props) =>{
  const classes = useStyles({ displayList:props.displayList });
  const { auth } = useSelector((state) => state);
  return(
    <div className={classes.displayList}>
      <div onClick = {()=> {props.setDisplayList(false)}} className={classes.background}></div>
      <div className={classes.listContainer}>
        <div className={classes.listheading}>
          <p className={classes.subHeadings}>{props.dataList.name}</p>
          <CloseIcon onClick = {()=> {props.setDisplayList(false)}}  />
        </div>
        <div className={classes.listItems}>
          
          {props.dataList.userData ?
            props.dataList.userData.map((user , i) =>{
              
              return(
                <div className={classes.userInfo} key={i}>
                  <div className={classes.profilePic}>
                  {auth.user.avatar ? (
                    <Avatar
                      className={classes.profileButton}
                      alt="Remy Sharp"
                      src={user.avatar}
                    />
                  ) : (
                    <Avatar
                      className={classes.profileButton}
                      sx={{ bgcolor: "##F39C12 " }}
                    >
                      {user.fullname[0]}
                    </Avatar>
                  )}
                  </div>
                  <div className={classes.userDetails}>
                    <p className={classes.fullName}>{user.fullname}</p>
                    <p className={classes.userName}>{user.username}</p>
                  </div>
                  <div className={classes.userFollowBtn}>
                    <Followbtn  user={user}></Followbtn>
                  </div>
                </div>)
            })        
          :
            <div></div>}
        </div>
      </div>
    </div>
  );
  
}

const ProfilePage = () => {
  const { profile, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  

  const [displayList , setDisplayList] = useState(false);
  const [dataList , setdataList] = useState({});

  const classes = useStyles({ displayList });
  useEffect(() => {
    if (profile.users.every(item => item._id !== id)) {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
    }
  }, [id, auth, dispatch, profile.users]);
  return (
    <div className={classes.root}>
      {profile.loading && <LinearProgress />}
      <DisplayList dataList={dataList} displayList={displayList} setDisplayList={setDisplayList}/>
      <Navbar />
      <div className={classes.profileContainer}>
        <Info setdataList={setdataList} setDisplayList={setDisplayList} id={id} />
        <Posts />
      </div>
    </div>
  );
};

export default ProfilePage;
