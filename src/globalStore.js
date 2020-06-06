import ajaxAPIsCreator from './ajax';
import Store from './Store';
import { adjustCollectionPageURL, handleize } from './helpers';
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
} from './attributeChangers';

const dispatchAjaxFailEvent = (source, error) => {
  const event = new CustomEvent('ajaxRequestFail', {
    detail: { data: error.response.data, source },
  });
  document.dispatchEvent(event);
};

const dispatchAjaxDoneEvent = (source, data) => {
  const event = new CustomEvent('ajaxRequestDone', {
    detail: { data, source },
  });
  document.dispatchEvent(event);
};

const cartTransformFns =
  (window.themeName &&
    window[window.themeName] &&
    window[window.themeName].cartTransformFns) ||
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
  const { template } = window[window.themeName];
  const { canonical_url } = window[window.themeName];

  let initialState = {
    cart: null,
    cart_is_updating: false,
  };

  switch (template) {
    case 'collection':
      initialState = Object.assign(initialState, {
        collection: null,
        collection_is_updating: false,
      });
      break;

    default:
      break;
  }

  const actions = {
    addItems(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .addItem({ data: { items: payload } })
        .then(function (items) {
          return apis.getCart();
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
          dispatchAjaxDoneEvent('addItems', cart);
        })
        .catch((error) => {
          context.commit('setCartIsUpdating', false);
          dispatchAjaxFailEvent('addItems', error);
        });
    },
    addItemFromForm(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .addItem({ data: new FormData(payload) })
        .then(() => apis.getCart())
        .then((cart) => {
          return cartTransformFns.reduce((p, fn) => {
            // eslint-disable-next-line no-debugger
            debugger;
            return p.then(fn);
          }, Promise.resolve(cart));
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
          dispatchAjaxDoneEvent('addItemFromForm', cart);
        })
        .catch((error) => {
          context.commit('setCartIsUpdating', false);
          dispatchAjaxFailEvent('addItemFromForm', error);
        });
    },
    addItem(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .addItem({
          data: {
            id: payload.id,
            quantity: payload.quantity,
            properties: payload.properties,
          },
        })
        .then(() => apis.getCart())
        .then((cart) => {
          return cartTransformFns.reduce((p, fn) => {
            return p.then(fn);
          }, Promise.resolve(cart));
          // cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
          dispatchAjaxDoneEvent('addItem', cart);
        })
        .catch((error) => {
          context.commit('setCartIsUpdating', false);
          dispatchAjaxFailEvent('addItem', error);
        });
    },
    changeItemByLine(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .changeItem({
          data: { line: payload.line, quantity: payload.quantity },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
          dispatchAjaxDoneEvent('changeItemByLine', cart);
          if (cart.items.find((item, index) => index == payload.line - 1)) {
            const modifiedItem = cart.items.find(
              (item, index) => index == payload.line - 1
            );
            if (modifiedItem.quantity != payload.quantity) {
              throw {
                response: {
                  data: {
                    description: `All ${modifiedItem.quantity} ${modifiedItem.title} are in your cart.`,
                    message: 'Cart Error',
                    status: 200,
                  },
                },
              };
            }
          }
        })
        .catch((error) => {
          context.commit('setCartIsUpdating', false);
          dispatchAjaxFailEvent('changeItemByLine', error);
        });
    },
    changeItemByKey(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .changeItem({
          data: { id: payload.key, quantity: payload.quantity },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
          dispatchAjaxDoneEvent('changeItemByKey', cart);
          if (cart.items.find((item) => item.key == payload.key)) {
            const modifiedItem = cart.items.find(
              (item) => item.key == payload.key
            );
            if (modifiedItem.quantity != payload.quantity) {
              throw {
                response: {
                  data: {
                    description: `All ${modifiedItem.quantity} ${modifiedItem.title} are in your cart.`,
                    message: 'Cart Error',
                    status: 200,
                  },
                },
              };
            }
          }
        })
        .catch((error) => {
          context.commit('setCartIsUpdating', false);
          dispatchAjaxFailEvent('changeItemByKey', error);
        });
    },
    removeItemByLine(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .changeItem({
          data: { line: payload, quantity: 0 },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent('removeItemByLine', error);
          context.commit('setCartIsUpdating', false);
        });
    },
    removeItemByKey(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .changeItem({
          data: { id: payload, quantity: 0 },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent('removeItemByKey', error);
          context.commit('setCartIsUpdating', false);
        });
    },
    updateCartFromForm(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .updateCart({
          data: new FormData(payload),
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent('updateCartFromForm', error);
          context.commit('setCartIsUpdating', false);
        });
    },
    updateCartAttributes(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .updateCart({
          data: { attributes: payload },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent('updateCartAttributes', error);
          context.commit('setCartIsUpdating', false);
        });
    },
    updateCartNote(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .updateCart({
          data: { note: payload },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent('updateCartNote', error);
          context.commit('setCartIsUpdating', false);
        });
    },
    clearCart(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis
        .clearCart()
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit('setCart', cart);
          context.commit('setCartIsUpdating', false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent('clearCart', error);
          context.commit('setCartIsUpdating', false);
        });
    },
    changeCollectionCurrentTags(context, payload) {
      console.log(payload);
      if (context.state.collection !== undefined) {
        context.commit('setCollectionCurrentTags', payload);
        context.commit('setCollectionIsUpdating', true);
        let current_tags;
        let params;
        if (
          context.state.collection.handle === 'types' ||
          context.state.collection.handle === 'vendors'
        ) {
          params = {
            q: context.state.collection.title,
            constraint: payload,
            page: context.state.collection.page,
            sort_by: context.state.collection.sort_by,
          };
        } else {
          current_tags = payload;
          params = {
            page: context.state.collection.page,
            sort_by: context.state.collection.sort_by,
          };
        }

        adjustCollectionPageURL(
          params,
          current_tags,
          context.state.collection.handle
        );

        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: 'theme',
            params,
            current_tags,
          })
          .then(({ products, products_count }) => {
            context.commit('setCollectionProductsCount', products_count);
            context.commit('setCollectionPage', 1);
            context.commit('setCollectionProducts', products);
            context.commit('setCollectionIsUpdating', false);
          });
      }
    },
    changeCollectionPage(context, payload) {
      if (context.state.collection) {
        context.commit('setCollectionPage', payload);
        context.commit('setCollectionIsUpdating', true);
        let current_tags;
        let params;
        if (
          context.state.collection.handle === 'types' ||
          context.state.collection.handle === 'vendors'
        ) {
          params = {
            q: context.state.collection.title,
            constraint: context.state.collection.current_tags,
            page: payload,
            sort_by: context.state.collection.sort_by,
          };
        } else {
          current_tags = context.state.collection.current_tags;
          params = {
            page: payload,
            sort_by: context.state.collection.sort_by,
          };
        }

        adjustCollectionPageURL(
          params,
          current_tags,
          context.state.collection.handle
        );

        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: 'theme',
            params,
            current_tags,
          })
          .then(({ products }) => {
            context.commit('setCollectionProducts', products);
            context.commit('setCollectionIsUpdating', false);
          });
      }
    },
    changeCollectionSortBy(context, payload) {
      if (context.state.collection) {
        context.commit('setCollectionSortBy', payload);
        context.commit('setCollectionIsUpdating', true);

        let current_tags;
        let params;
        if (
          context.state.collection.handle === 'types' ||
          context.state.collection.handle === 'vendors'
        ) {
          params = {
            q: context.state.collection.title,
            constraint: context.state.collection.current_tags,
            page: context.state.collection.page,
            sort_by: payload,
          };
        } else {
          current_tags = context.state.collection.current_tags;
          params = {
            page: context.state.collection.page,
            sort_by: payload,
          };
        }

        adjustCollectionPageURL(
          params,
          current_tags,
          context.state.collection.handle
        );

        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: 'theme',
            params,
            current_tags,
          })
          .then(({ products }) => {
            context.commit('setCollectionProducts', products);
            context.commit('setCollectionIsUpdating', false);
          });
      }
    },
    changeCollectionViewType(context, payload) {
      if (context.state.collection) {
        context.commit('setCollectionViewType', payload);
      }
    },
    initiate(context, payload) {
      context.commit('setCartIsUpdating', true);
      apis.getCart().then((cart) => {
        context.commit('setCart', cart);
        context.commit('setCartIsUpdating', false);
      });
      if (context.state.collection !== undefined) {
        context.commit('setCartIsUpdating', true);
        context.commit('setCollectionIsUpdating', true);
        let current_tags;
        let handle;
        let page;
        let sort_by;
        let params;
        let search_params;
        const current_page_url =
          window.themeName &&
          window[window.themeName] &&
          window[window.themeName].canonical_url
            ? window[window.themeName].canonical_url
            : window.location.href;

        handle = new URL(current_page_url).pathname.split('/')[2];
        search_params = new URL(current_page_url).searchParams;
        params = {};
        if (handle === 'types' || handle === 'vendors') {
          params.q = search_params.get('q');
          search_params.get('constraint') &&
            (params.constraint = search_params.get('constraint'));
        } else {
          new URL(current_page_url).pathname.split('/').length > 3 &&
            (current_tags = new URL(current_page_url).pathname.split('/')[3]);
        }
        search_params.get('page') && (params.page = search_params.get('page'));
        search_params.get('sort_by') &&
          (params.sort_by = search_params.get('sort_by'));

        apis
          .getCollection({
            handle,
            view: 'theme',
            params,
            current_tags,
          })
          .then((collection) => {
            return collectionTransformFns.reduce((p, fn) => {
              return p.then(fn);
            }, Promise.resolve(collection));
          })
          .then((collection) => {
            context.commit('setCollection', collection);
            context.commit('setCollectionIsUpdating', false);
          });
      }
    },
  };

  const mutations = {
    setCart(state, payload) {
      state.cart = payload;
      return state;
    },
    setCartIsUpdating(state, payload) {
      state.cart_is_updating = payload;
      return state;
    },
    setCollection(state, payload) {
      state.collection = payload;
      return state;
    },
    setCollectionProductsCount(state, payload) {
      state.collection = { ...state.collection, products_count: payload };
    },
    setCollectionCurrentTags(state, payload) {
      state.collection = { ...state.collection, current_tags: payload };
      return state;
    },
    setCollectionPage(state, payload) {
      state.collection = { ...state.collection, page: payload };
      return state;
    },
    setCollectionSortBy(state, payload) {
      state.collection = { ...state.collection, sort_by: payload };
      return state;
    },
    setCollectionProducts(state, payload) {
      state.collection = { ...state.collection, products: payload };
      return state;
    },
    setCollectionViewType(state, payload) {
      state.collection = { ...state.collection, view_type: payload };
      return state;
    },
    setCollectionIsUpdating(state, payload) {
      state.collection_is_updating = payload;
      return state;
    },
  };

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
