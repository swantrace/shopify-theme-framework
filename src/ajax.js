/* eslint-disable no-self-assign */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setupCache } from 'axios-cache-adapter';

export default async (config, shop) => {
  await localforage.defineDriver(memoryDriver);
  const forageStore = localforage.createInstance({
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      // eslint-disable-next-line no-underscore-dangle
      memoryDriver._driver,
    ],
    name: 'db-cache',
  });
  const cache = setupCache({ ...config.cache, store: forageStore });
  const axiosConfig = {
    ...config.axios,
    adapter: cache.adapter,
  };
  const instance = axios.create(axiosConfig);
  const { themeId } = shop;
  const ajaxFunctionPromiseCreator = function ajaxFunctionPromiseCreator({
    method,
    url,
  } = {}) {
    const fn = ({
      baseURL = null,
      mlRootURL = '/',
      handle = null,
      blog_handle = null,
      current_tags = null,
      view = null,
      params = {},
      data = {},
      transforms = [],
      onUploadProgress = (progressEvent) => {},
      onDownloadProgress = (progressEvent) => {},
      requestInterceptor = (config) => config,
      requestInterceptorError = (error) => Promise.reject(error),
      responseInterceptor = (response) => response,
      responseInterceptorError = (error) => Promise.reject(error),
      ...otherParams
    } = {}) => {
      let currentInstance;
      if (typeof baseURL === 'string') {
        currentInstance = axios.create({ ...config, baseURL });
      } else {
        currentInstance = instance;
      }
      if (
        ['/cart/add.js', '/cart/change.js', '/cart/update.js'].includes(url)
      ) {
        currentInstance.defaults.headers.post['X-Requested-With'] =
          'XMLHttpRequest';
      } else {
        delete currentInstance.defaults.headers.post['X-Requested-With'];
      }
      instance.interceptors.request.use(
        requestInterceptor,
        requestInterceptorError
      );
      instance.interceptors.response.use(
        responseInterceptor,
        responseInterceptorError
      );
      let realURL = url;
      if (typeof blog_handle === 'string') {
        realURL = url.replace('[blog_handle]', blog_handle);
      }
      if (typeof handle === 'string') {
        realURL = realURL.replace('[handle]', handle);
      }
      if (typeof current_tags === 'string') {
        realURL = realURL.replace('[current_tags]', current_tags);
      } else {
        realURL = realURL.replace('/tagged/[current_tags]', '');
        realURL = realURL.replace('/[current_tags]', '');
      }
      if (typeof view === 'string') {
        params = { ...params, view };
        realURL = realURL.replace('.js', '');
        if (typeof themeId === 'string') {
          params = { ...params, preview_theme_id: themeId };
        }
      }
      const transformResponse = [
        (data) => {
          if (typeof data === 'string') {
            try {
              data = data
                .replace('<!-- BEGIN template -->', '')
                .replace('<!-- END template -->', '')
                .replace('<!-- collection.theme -->', '')
                .replace('<!-- product.theme -->', '')
                .replace('<!-- search.theme -->', '')
                .replace('<!-- page.theme -->', '')
                .replace('<!-- cart.theme -->', '')
                .replace('<!-- blog.theme -->', '')
                .replace('<!-- article.theme -->', '');
              data = JSON.parse(data);
            } catch (err) {
              data = data;
            }
          }
          return data;
        },
        ...transforms,
      ];
      if (mlRootURL !== '/') {
        realURL = `${mlRootURL}${realURL}`;
      }
      return currentInstance({
        url: realURL,
        method,
        params,
        data,
        cache,
        transformResponse,
        onUploadProgress,
        onDownloadProgress,
        ...otherParams,
      }).then((response) => response.data);
    };
    return fn;
  };
  const getCart = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/cart.js',
  });

  const getProduct = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/products/[handle].js',
  });

  const addItem = ajaxFunctionPromiseCreator({
    method: 'post',
    url: '/cart/add.js',
  });

  const changeItem = ajaxFunctionPromiseCreator({
    method: 'post',
    url: '/cart/change.js',
  });

  const updateCart = ajaxFunctionPromiseCreator({
    method: 'post',
    url: '/cart/update.js',
  });

  const clearCart = ajaxFunctionPromiseCreator({
    method: 'post',
    url: '/cart/clear.js',
  });

  const getProducts = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/products.json',
  });

  const getShippingRates = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/shipping_rates.json',
  });

  const getProductRecommendations = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/recommendations/products.json',
  });

  const getPredictSearch = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/search/suggest.json',
  });

  const getSearch = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/search',
  });

  const getCollection = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/collections/[handle]/[current_tags]',
  });

  const getBlog = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/blogs/[handle]/tagged/[current_tags]',
  });

  const getArticle = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/blogs/[blog_handle]/[handle]',
  });

  const getPage = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/pages/[handle]',
  });

  const getCollections = ajaxFunctionPromiseCreator({
    method: 'get',
    url: '/collections',
  });

  return {
    getCart,
    getProduct,
    addItem,
    changeItem,
    updateCart,
    clearCart,
    getProducts,
    getShippingRates,
    getProductRecommendations,
    getPredictSearch,
    getSearch,
    getCollection,
    getBlog,
    getArticle,
    getPage,
    getCollections,
  };
};
