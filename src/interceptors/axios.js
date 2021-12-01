import Axios from 'axios';

import { isAlive } from '@/api/healthcheck';

import store from '@/store';
import router from '@/router';

Axios.interceptors.request.use(
  (request) => {
    store.commit('addLoadingReq');
    request.headers['Authorization'] = `Bearer ${store.state.auth.token}`;
    if (request.method === 'get') {
      const source = Axios.CancelToken.source();
      request.cancelToken = source.token;
      if (!request.doNotInterfere) {
        store.commit('addGetReq', source);
      }
    }
    if (!store.state.auth.token) return Promise.reject();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    console.log(response);
    store.commit('removeLoadingReq');
    if (response.data.success === false) {
      console.log('response error');
      throw new Error(response.message);
    }
    return response;
  },
  async (error) => {
    store.commit('removeLoadingReq');

    if (!error.response && !(await isAlive())) return router.push('/503');
    else if (error.status === 401) return store.dispatch('authenticate');

    throw new Error(error);
  }
);
