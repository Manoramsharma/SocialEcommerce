export const GLOBALTYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  PRODUCT: "PRODUCT",
};

export const EditData = (data, id, post) => {
  const newData = data.map(item => (item.username === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter(item => item.username !== id);
  return newData;
};
