import axios from "axios";
import localforage from "localforage";
import memoryDriver from "localforage-memoryStorageDriver";
import { setupCache } from "axios-cache-adapter";
import { throwIfMissing } from "./helpers";
window.theme = window.theme || {};
window.theme.config = window.theme.config || {};
window.theme.config.axios = window.theme.config.axios || {};
window.theme.config.cache = window.theme.config.cache || {};
window.theme.id = window.theme.id || null;

export default async () => {
  await localforage.defineDriver(memoryDriver);
  const forageStore = localforage.createInstance({
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      memoryDriver._driver,
    ],
    name: "db-cache",
  });
  const cache = setupCache({ ...theme.config.cache, store: forageStore });
  const config = {
    ...window.theme.config.axios,
    adapter: cache.adapter,
  };
  const instance = axios.create(config);
  const themeId = window.theme.id;
  const ajaxFunctionPromiseCreator = function ajaxFunctionPromiseCreator({
    method = throwIfMissing("method"),
    url = throwIfMissing("url"),
  } = {}) {
    const fn = ({
      baseURL = null,
      handle = null,
      blog_handle = null,
      tags = null,
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
      errorHandler = (error) => {
        console.log(error);
      },
      ...otherParams
    } = {}) => {
      let currentInstance;
      if (typeof baseURL === "string") {
        currentInstance = axios.create({ ...config, baseURL });
      } else {
        currentInstance = instance;
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
      if (typeof blog_handle === "string") {
        realURL = url.replace("[blog_handle]", blog_handle);
      }
      if (typeof handle === "string") {
        realURL = realURL.replace("[handle]", handle);
      }
      if (typeof tags === "string") {
        realURL = realURL.replace("[tags]", tags);
      } else {
        realURL = realURL.replace("/tagged/[tags]", "");
        realURL = realURL.replace("/[tags]", "");
      }
      if (typeof view === "string") {
        params = { ...params, view };
        realURL = realURL.replace(".js", "");
        if (typeof themeId === "string") {
          params = { ...params, preview_theme_id: themeId };
        }
      }
      const transformResponse = [
        (data) => {
          if (typeof data === "string") {
            try {
              data = JSON.parse(data);
            } catch (err) {
              data = data;
            }
          }
          return data;
        },
        ...transforms,
      ];
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
      })
        .then((response) => response.data)
        .catch(errorHandler);
    };
    return fn;
  };
  const getCart = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/cart.js",
  });

  const getProduct = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/products/[handle].js",
  });

  const addItem = ajaxFunctionPromiseCreator({
    method: "post",
    url: "/cart/add.js",
  });

  const changeItem = ajaxFunctionPromiseCreator({
    method: "post",
    url: "/cart/change.js",
  });

  const updateCart = ajaxFunctionPromiseCreator({
    method: "post",
    url: "/cart/update.js",
  });

  const clearCart = ajaxFunctionPromiseCreator({
    method: "post",
    url: "/cart/clear.js",
  });

  const getProducts = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/products.json",
  });

  const getShippingRates = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/shipping_rates.json",
  });

  const getProductRecommendations = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/recommendations/products.json",
  });

  const getPredictSearch = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/search/suggest.json",
  });

  const getSearch = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/search",
  });

  const getCollection = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/collections/[handle]/[tags]",
  });

  const getBlog = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/blogs/[handle]/tagged/[tags]",
  });

  const getArticle = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/blogs/[blog_handle]/[handle]",
  });

  const getPage = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/pages/[handle]",
  });

  const getCollections = ajaxFunctionPromiseCreator({
    method: "get",
    url: "/collections",
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
