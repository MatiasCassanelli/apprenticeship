export const SET_VIDEO_TIME = 'player/SET_VIDEO_TIME';

const setVideoTime = (payload) => ({
  type: SET_VIDEO_TIME,
  payload,
});

export { setVideoTime };
