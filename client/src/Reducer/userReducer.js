const initialState = {
  user: {},
  token: ""
};
  
const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case "LOAD_USER": {
    const newUser = action.payload.data;
    return { ...state, user: {...state.user, newUser} };
  }
  case "LOGIN": {
    const token = action.payload.token;
    const user = action.payload.user;
    return {...state,token: token , user: user };
  }
  default: return state;}};
  

export default userReducer;
