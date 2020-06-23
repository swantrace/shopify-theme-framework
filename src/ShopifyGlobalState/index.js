import ajaxAPIsCreator from '../ajax';
import Store from '../Store';
import { handleize } from '../helpers';
import {
  cartInitialState,
  collectionInitialState,
  productInitialState,
} from '../types/constants';

import {
  addItem,
  addItemFromForm,
  addItems,
  changeItemByKey,
  changeItemByLine,
  updateCartAttributes,
  updateCartFromForm,
  updateCartNote,
  removeItemByKey,
  removeItemByLine,
  clearCart,
  changeCollectionCurrentTags,
  changeCollectionPage,
  changeCollectionSortBy,
  changeCollectionViewType,
} from './actions';
import {
  enableCartIsUpdating,
  disableCartIsUpdating,
  enableCollectionIsUpdating,
  disableCollectionIsUpdating,
  setCartAttribute,
  setCollectionTagsFilterAttribute,
  setCollectionPageControllerAttribute,
  setCollectionSortByControllerAttribute,
  setCollectionViewTypeControllerAttribute,
  setCollectionProductsListAttribute,
} from '../attributeChangers';

const cartTransformFns =
  (window.themeName &&
    window[window.themeName] &&
    window[window.themeName].cartTransformFns) ||
  [];

const productTransformFns =
  (window.themeName &&
    window[window.themeName] &&
    window[window.themeName].productTransformFns) ||
  [];

const collectionTransformFns = (window.themeName &&
  window[window.themeName] &&
  window[window.themeName].collectionTransformFns && [
    ...window[window.themeName].collectionTransformFns,
    (collection) => {
      return {
        ...collection,
        all_tags: collection.all_tags.map((tag) => {
          return { label: tag, handle: handleize(tag) };
        }),
      };
    },
  ]) || [
  (collection) => {
    return {
      ...collection,
      all_tags: collection.all_tags.map((tag) => {
        return { label: tag, handle: handleize(tag) };
      }),
    };
  },
];

export default async () => {
  const apis = await ajaxAPIsCreator();

  const initialState = {
    cart: cartInitialState,
    collection: collectionInitialState,
    product: productInitialState,
    cart_is_updating: false,
    collection_is_updating: false,
  };

  const actions = {
    addItem: addItem(apis, cartTransformFns),
    addItemFromForm: addItemFromForm(apis, cartTransformFns),
    addItems: addItems(apis, cartTransformFns),
    changeItemByKey: changeItemByKey(apis, cartTransformFns),
    changeItemByLine: changeItemByLine(apis, cartTransformFns),
    updateCartAttributes: updateCartAttributes(apis, cartTransformFns),
    updateCartFromForm: updateCartFromForm(apis, cartTransformFns),
    updateCartNote: updateCartNote(apis, cartTransformFns),
    removeItemByKey: removeItemByKey(apis, cartTransformFns),
    removeItemByLine: removeItemByLine(apis, cartTransformFns),
    clearCart: clearCart(apis, cartTransformFns),
    changeCollectionCurrentTags: changeCollectionCurrentTags(
      apis,
      collectionTransformFns,
      productTransformFns
    ),
    changeCollectionPage: changeCollectionPage(
      apis,
      collectionTransformFns,
      productTransformFns
    ),
    changeCollectionSortBy: changeCollectionSortBy(
      apis,
      collectionTransformFns,
      productTransformFns
    ),
    changeCollectionViewType,
  };

  const mutations = {};

  const store = new Store({
    actions,
    mutations,
    initialState,
  });

  store.subscribe(function (keysArr, newValue, oldValue) {
    switch (keysArr[0]) {
      case 'cart_is_updating':
        if (typeof window[themeName].onCartIsUpdatingChanged === 'function') {
          window[themeName].onCartIsUpdatingChanged(newValue);
        } else {
          newValue === true ? enableCartIsUpdating() : disableCartIsUpdating();
        }
        break;
      case 'cart':
        if (typeof window[themeName].onCartChanged === 'function') {
          window[themeName].onCartChanged(newValue, oldValue);
        } else {
          setCartAttribute(newValue, oldValue);
        }
        break;
      case 'collection':
        if (!oldValue) {
          setCollectionTagsFilterAttribute(newValue);
          setCollectionPageControllerAttribute(newValue);
          setCollectionSortByControllerAttribute(newValue);
          setCollectionViewTypeControllerAttribute(newValue);
          setCollectionProductsListAttribute(newValue);
        } else {
          switch (keysArr[1]) {
            case 'current_tags':
              setCollectionTagsFilterAttribute(newValue);
              break;
            case 'page':
              setCollectionPageControllerAttribute(newValue);
              break;
            case 'sort_by':
              setCollectionSortByControllerAttribute(newValue);
              break;
            case 'view_type':
              setCollectionViewTypeControllerAttribute(newValue);
              break;
            case 'products':
              setCollectionProductsListAttribute(newValue);
              setCollectionPageControllerAttribute(newValue);
              break;
            default:
              break;
          }
        }
      case 'collection_is_updating':
        if (
          typeof window[themeName].onCollectionIsUpdatingChanged === 'function'
        ) {
          window[themeName].onCollectionIsUpdatingChanged(newValue);
        } else {
          newValue === true
            ? enableCollectionIsUpdating()
            : disableCollectionIsUpdating();
        }
        break;
      default:
        break;
    }
  });

  // may not be necessary in the future
  window[window.themeName].store = store;
  window[window.themeName].ajax = apis;

  return { store, apis };
};
