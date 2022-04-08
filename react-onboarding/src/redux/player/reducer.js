import { SET_VIDEO_TIME } from './actions';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_VIDEO_TIME:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
