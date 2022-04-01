import axios from 'axios';

const getAuthToken = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/authentication/token/new',
      {
        params: {
          api_key: process.env.REACT_APP_FILM_DB_API_KEY,
        },
      },
    );
    if (response.status === 200) {
      const d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      document.cookie = `reqToken=${response.data.request_token}; 'expires='${d}`;
    }
    window.location.href = `https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=http://localhost:3000/login/redirect`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const signIn = async (reqToken) => {
  try {
    const response = await axios.post(
      'https://api.themoviedb.org/3/authentication/session/new',
      {
        request_token: reqToken,
      },
      {
        params: {
          api_key: process.env.REACT_APP_FILM_DB_API_KEY,
        },
      },
    );
    if (response?.status === 200) {
      return response.data;
    }
    return response;
  } catch (error) {
    return error;
  }
};

const signOut = async (sessionId) => {
  try {
    const response = await axios.delete(
      'https://api.themoviedb.org/3/authentication/session',
      {
        data: {
          session_id: sessionId,
        },
        params: {
          api_key: process.env.REACT_APP_FILM_DB_API_KEY,
        },
      },
    );
    if (response?.status === 200) {
      return response.data;
    }
    return response;
  } catch (error) {
    return error;
  }
};

const getUserDetails = async (sessionId) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/account', {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
        session_id: sessionId,
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    return response;
  } catch (error) {
    return error;
  }
};

export { getAuthToken, signIn, getUserDetails, signOut };
