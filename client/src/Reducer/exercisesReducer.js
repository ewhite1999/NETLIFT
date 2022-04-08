const initialState = {
  exercise: []
};

const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_EXERCISES": {
      const exercise = action.payload;

      return { ...state, exercise: [...state.exercise, exercise] };
    }
    default:
      return state;
  }
};

export default exercisesReducer;
