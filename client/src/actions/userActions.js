import axios from "axios";
const api = process.env.API_URL;

const loading = (text) => ({ type: "LOADING", payload: text });

export const registerUser = (e) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${api}register`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      });
      return dispatch(loginUser(e));
    } catch (err) {
      return err;
    }
  };
};

export const loginUser = (e) => {
  return async (dispatch) => {
    try {
      const username = e.target.username.value;
      const { data } = await axios.post(`${api}login`, {
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
    dispatch(loading("getting programs"));
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${api}user`, {
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

export const updateUser = (updateCase) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log(updateCase);

      const { data } = await axios.patch(`${api}user`, updateCase, {
        headers: { Authorization: token }
      });

      if (data) {
        dispatch({
          type: "LOGOUT",
          payload: true
        });
        localStorage.removeItem("token");
        alert(
          "Username has been changed, you have been logged out. \n Please refresh and sign in with the new username"
        );
      }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err
      });
    }
  };
};

export const getQuote = async () => {
  try {
    const { data } = await axios.get("https://type.fit/api/quotes");
    const randomNumber = Math.floor(Math.random() * 1643);
    const quote = data[randomNumber].text;
    return quote;
  } catch (err) {
    console.log(err);
  }
};

export const updateLifts = (exName) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "LOAD_EXERCISES",
        payload: exName
      });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err
      });
    }
  };
};

export const setExercises = (exercises) => {
  return async (dispatch) => {
    dispatch({
      type: "LOAD_EXERCISES",
      payload: exercises
    });
  };
};

export const setProgram = (program) => {
  return async () => {
    const { data } = await axios.post(`${api}program`, {
      program: program
    });
  };
};
