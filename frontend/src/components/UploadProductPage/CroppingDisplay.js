import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";
import { uploadProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "cropperjs/dist/cropper.min.css";
import Cropper from "react-cropper";

const useStyles = makeStyles({
  root: {
    position: "relative",
    top: 0,
    left: 0,
    width: "40%",
    "@media (max-width:500px)": {
      width: "90%",
      left: "50%",
      transform: "translateX(-50%)",
    },
    padding:props => props.cropperDisplay ? '0px' : '5%',
    height:props => props.cropperDisplay ? '0px' : '100%',
    overflow:'hidden',
  },
});

const CroppingDisplay = props => {
  const classes = useStyles({ cropperDisplay: props.cropperDisplay });
  const cropperRef = useRef();
  const [croppedImage, setCroppedImage] = useState("");
  useEffect(() => {
    if (props.currentImageIndex >= 0) {
      props.setCurrentCroppedImage({
        src: croppedImage,
        index: props.currentImageIndex,
      });
    }
  }, [croppedImage]);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const canvas = cropper.getCroppedCanvas();
    setCroppedImage(canvas.toDataURL("image/png"));
  };

  return (
    <div className={classes.root}>
      <Cropper
        src={props.image}
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        zoomable={false}
        scalable={false}
        movable={false}
        aspectRatio={1}
        background={false}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
    </div>
  );
};

export default CroppingDisplay;
