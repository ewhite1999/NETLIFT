import axios from "axios";


export const registerUser = async (e) => {
  
  return async () => {
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/register", {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      });
      console.log(data);
      await loginUser(e);
    } catch (err) {
      return err;
    }
  };
};

export const loginUser = async (e) => {
  console.log("line 24");
  return async (dispatch) => {
    try {

      const username = e.target.username.value;
      console.log(username);
      const { data } = await axios.post("http://127.0.0.1:5000/login", {
        username: e.target.username.value,
        password: e.target.password.value
      });
      let token = `Bearer ${data.access_token}`;
      localStorage.setItem("token", token);
      dispatch({
        type: "LOGIN",
        payload: { user: username, token: token }
      });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err
      });
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://127.0.0.1:5000/user", {
        headers: { Authorization: token }
      });
      dispatch({
        type: "LOAD_USER",
        payload: data
      });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err
      });
    }
  };
};
