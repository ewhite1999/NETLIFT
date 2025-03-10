const initialState = {
  user: "",
  profile: {},
  logout: false,
  token: "",
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      return { ...state, loading: true, profile: action.payload };
    }
    case "LOAD_USER": {
      const profile = action.payload;
      return { ...state, profile: profile, loading: false };
    }
    case "LOGIN": {
      const token = action.payload.token;
      const user = action.payload.user;
      return { ...state, token: token, user: user };
    }
    case "LOGOUT": {
      const isLoggedOut = action.payload;
      return { ...state, logout: isLoggedOut };
    }
    default:
      return state;
  }
};

export default userReducer;
