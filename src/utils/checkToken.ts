export const checkToken = (): boolean => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
