import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "./Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
toast.configure();
const Notify = () => {
  const { alert } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      {alert.loading && (
        <LinearProgress style={{ zIndex: 2000, position: "fixed" }} />
      )}
      {alert.error && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {alert.success && (
        <Toast
          msg={{ title: "Success", body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};
export default Notify;
