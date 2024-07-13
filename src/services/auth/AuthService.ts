import axios from 'axios';
import {getRefreshToken} from '../../utils';

const login = async (username: string, password: string) => {
  const response = await axios.post('https://dummyjson.com/auth/login', {
    username,
    password,
  });
  return response;
};

const fetchCurrentUser = async (accessToken: string) => {
  try {
    const response = await axios.get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const refresh_token = await getRefreshToken();
      //   Access token is expired, try to refresh it
      const {token} = await refreshAccessToken(refresh_token);
      if (token) {
        return await fetchCurrentUser(token);
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      'https://dummyjson.com/auth/refresh',
      {
        refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error refreshing access token');
    return null;
  }
};

export {login, fetchCurrentUser, refreshAccessToken};
