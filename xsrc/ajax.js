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
      if (typeof handle === "string") {
        url = url.replace("[handle]", handle);
      }
      if (typeof view === "string") {
        params = { ...params, view };
        url = url.replace(".js", "");
        if (typeof themeId === "string") {
          params = { ...params, preview_theme_id: themeId };
        }
      }
      const transformResponse = [
        (data) => {
          if (typeof data === "string") {
            data = JSON.parse(data);
          }
          return data;
        },
        ...transforms,
      ];
      return currentInstance({
        url,
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

  return {
    getCart,
    getProduct,
    addItem,
    changeItem,
    updateCart,
    clearCart,
    getProducts,
  };
};

// export const getAllProducts = function () {
//   return "hello world!";
// };
// export const getCollectionProducts = function () {
//   return "hello world!";
// };
// export const updateCartFromForm = function () {
//   return "hello world!";
// };
// export const updateCartAttributes = function () {
//   return "hello world!";
// };
// export const updateCartNote = function () {
//   return "hello world!";
// };
// export const getArticle = function () {
//   return "hello world!";
// };
// export const getBlogArticles = function () {
//   return "hello world!";
// };
// export const getPage = function () {
//   return "hello world!";
// };
// export const getSearchResults = function () {
//   return "hello world!";
// };
// export const getPredictSearch = function () {
//   return "hello world!";
// };
// export const getProductRecommendations = function () {
//   return "hello world!";
// };

// export default {
//   getCartCreator,
//   getAllProducts,
//   getArticle,
//   getBlogArticles,
//   getPage,
//   getCollectionProducts,
//   getPredictSearch,
//   getProductCreator,
//   getProductRecommendations,
//   getSearchResults,
//   getAllProducts,
//   addItemCreator,
//   addItemFromForm,
//   addItems,
//   updateCartAttributes,
//   updateCartFromForm,
//   updateCartNote,
//   changeItemByKey,
//   changeItemByLine,
//   changeItemByVariantId,
//   removeItemByKey,
//   removeItemByLine,
//   removeItemByVariantId,
//   clearCart,
// };
