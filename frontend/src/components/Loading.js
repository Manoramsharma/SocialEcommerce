import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Loading = () => {
  return <div>
     { toast("loading...")}
    <ToastContainer />

  </div>;
};

export default Loading;
