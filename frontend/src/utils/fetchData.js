import axios from "axios";
import { API } from "../Backend";
export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${API}/api/${url}`, {
    headers: { Authorization: token },
  });

  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${API}/api/${url}`, post, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${API}/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${API}/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${API}/api/${url}`, {
    headers: { Authorization: token },
  });

  return res;
};
