/* eslint-disable no-param-reassign */
import axios from 'axios';

class API {
  axios;

  constructor() {
    this.axios = axios;
    this.axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    this.interceptorsJWT();
  }

  setauthorizationToken(token: string) {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  removeAuthorizationToken() {
    this.axios.defaults.headers.common.Authorization = null;
  }

  interceptorsJWT() {
    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          const accessToken = localStorage.getItem('accessToken');

          if (refreshToken) {
            const { data: token } = await axios.post(
              `user/refreshToken`,
              { refreshToken },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            localStorage.setItem('accessToken', token.data.accessToken);
            error.config.headers.Authorization = `Bearer ${token.data.accessToken}`;
            this.setauthorizationToken(token.data.accessToken);

            return this.axios.request(error.config);
          }
        }
        return Promise.reject(error);
      }
    );
  }
}
export default new API();
