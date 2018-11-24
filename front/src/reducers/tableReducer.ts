import { FETCH_ROWS, FETCH_VARIABLES, UPDATE_CURRENT_VARIABLE } from "../actions/types";

const initialState = {
  currentVariable: "",
  rows: [],
  variables: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROWS:
      return {
        ...state,
        rows: action.data,
      };
    case FETCH_VARIABLES:
      return {
        ...state,
        variables: action.data,
      };
    case UPDATE_CURRENT_VARIABLE:
      return {
        ...state,
        currentVariable: action.data,
      };
    default:
      return state;
  }
}
