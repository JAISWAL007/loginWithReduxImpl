import {LOGIN} from '../actionTypes';

const initialState = {
  username: 'hruday@gmail.com',
  password: 'hruday123',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const {data} = action.payload;
      return {
        ...state,
        userDetails: data,
      };
    }
    default:
      return state;
  }
}
