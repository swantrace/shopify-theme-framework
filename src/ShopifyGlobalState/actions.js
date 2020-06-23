/**
 * @file include all the possible actions which can be triggered by website users
 */
import mapLimit from 'async.maplimit';
/**
 *
 * @param {*} description
 */
const InventoryShortageExeption = (description) => {
  this.response = {
    data: {
      description,
      message: 'Cart Error',
      status: 200,
    },
  };
};
/**
 *
 * @param {*} source
 * @param {*} error
 */
const dispatchAjaxFailEvent = (source, error) => {
  const event = new CustomEvent('ajaxRequestFail', {
    detail: { data: error.response.data, source },
  });
  document.dispatchEvent(event);
};
/**
 *
 * @param {*} source
 * @param {*} data
 */
const dispatchAjaxDoneEvent = (source, data) => {
  const event = new CustomEvent('ajaxRequestDone', {
    detail: { data, source },
  });
  document.dispatchEvent(event);
};
/**
 *
 * @param {*} context
 * @param {*} actionName
 */
const handleCartAjaxDone = (context, actionName) => (cart) => {
  context.commit('setCart', cart);
  context.commit('setCartIsUpdating', false);
  dispatchAjaxDoneEvent(actionName, cart);
  return cart;
};
/**
 *
 * @param {*} context
 * @param {*} actionName
 */
const handleCartAjaxFail = (context, actionName) => (error) => {
  context.commit('setCartIsUpdating', false);
  dispatchAjaxFailEvent(actionName, error);
  return false;
};
/**
 *
 * @param {*} context
 * @param {*} actionName
 */
const handleCollectionAjaxDone = (context, actionName) => (collection) => {
  context.commit('setCollectionIsUpdating', false);
  dispatchAjaxDoneEvent(actionName, collection);
  return collection;
};
/**
 *
 * @param {*} context
 * @param {*} actionName
 */
const handleCollectionAjaxFail = (context, actionName) => (error) => {
  context.commit('setCollectionIsUpdating', false);
  dispatchAjaxFailEvent(actionName, error);
  return false;
};

/**
 *
 * @param {*} payload
 * @param {*} actionName
 */
const validateUpdatedQuantity = (payload, actionName) => (cart) => {
  switch (actionName) {
    case 'changeItemByLine':
      if (cart.items.find((item, index) => index === payload.line - 1)) {
        const modifiedItem = cart.items.find(
          (item, index) => index === payload.line - 1
        );
        if (modifiedItem.quantity !== payload.quantity) {
          throw new InventoryShortageExeption(
            `All ${modifiedItem.quantity} ${modifiedItem.title} are in your cart.`
          );
        }
      }
      break;
    case 'changeItemByKey':
      if (cart.items.find((item) => item.key === payload.key)) {
        const modifiedItem = cart.items.find(
          (item) => item.key === payload.key
        );
        if (modifiedItem.quantity !== payload.quantity) {
          throw new InventoryShortageExeption(
            `All ${modifiedItem.quantity} ${modifiedItem.title} are in your cart.`
          );
        }
      }
      break;
    default:
      break;
  }
};
/**
 *
 * @param {Array<function>} transformFns
 */
const transformObject = (transformFns) => (obj) => {
  return transformFns.reduce((p, fn) => {
    return p.then(fn);
  }, Promise.resolve(obj));
};
/**
 *
 * @param {*} actionName
 * @param {*} promiseGenerator
 */
const cartActionTemplate = (actionName, promiseGenerator) => (
  apis,
  cartTransformFns
) => (context, payload) => {
  context.commit('setCartIsUpdating', true);
  promiseGenerator(apis, payload)
    .then((cart) => (cart.token && cart.items ? cart : apis.getCart()))
    .then(transformObject(cartTransformFns))
    .then(handleCartAjaxDone(context, actionName))
    .then(validateUpdatedQuantity(payload, actionName))
    .catch(handleCartAjaxFail(context, actionName));
};

/**
 *
 * @param {*} actionName
 * @todo rebuild the function to get new url making use of canonicalUrl and payload
 */
const collectionActionTemplate = (actionName, collectionPropertyName) => (
  apis,
  collectionTransformFns,
  productTransformFns
) => (context, payload) => {
  let params;
  let tmp1 = context.state.collection;
  tmp1 = { ...tmp1, [collectionPropertyName]: payload };
  context.commit(actionName.replace('change', 'set'), payload);
  context.commit('setCollectionIsUpdating', true);
  if (tmp1.handle === 'vendors' || tmp1.handle === 'types') {
    params = tmp1.current_tags
      ? {
          q: tmp1.title,
          constraint: tmp1.current_tags,
          page: tmp1.page,
          sort_by: tmp1.sort_by,
        }
      : {
          q: tmp1.title,
          page: tmp1.page,
          sort_by: tmp1.sort_by,
        };
    tmp1.current_tags = null;
  } else {
    params = {
      page: tmp1.page,
      sort_by: tmp1.sort_by,
    };
  }
  apis
    .getCollection({
      view: 'theme',
      handle: tmp1.handle,
      params,
      current_tags: tmp1.current_tags,
    })
    .then(transformObject(collectionTransformFns))
    .then((collection) => {
      context.commit('setCollection', collection);
      return collection;
    })
    .then((collection) => {
      const productsHandles = collection.products_handles;
      const tmp2 = collection;
      let productsCount = productsHandles.length;
      return new Promise((resolve, reject) => {
        mapLimit(
          productsHandles,
          5,
          (productHandle, callback) => {
            const products = [];
            apis
              .getProduct({
                view: 'theme',
                handle: productHandle,
              })
              .then(transformObject(productTransformFns))
              .then((product) => {
                productsCount -= 1;
                products.push(product);
                if (products.length === 5 || productsCount === 0) {
                  context.commit('addCollectionProducts', products);
                }
                return product;
              })
              .then((product) => {
                callback(null, product);
              })
              .catch((error) => {
                callback(error);
              });
          },
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              tmp2.products = results;
              resolve(tmp2);
            }
          }
        );
      });
    })
    .then(handleCollectionAjaxDone(context, actionName))
    .catch(handleCollectionAjaxFail(context, actionName));
};

export const addItems = cartActionTemplate('addItems', (apis, payload) =>
  apis.addItem({ data: { items: payload } })
);

export const addItemFromForm = cartActionTemplate(
  'addItemFromForm',
  (apis, payload) => apis.addItem({ data: new FormData(payload) })
);

export const addItem = cartActionTemplate('addItem', (apis, payload) =>
  apis.addItem({
    data: {
      id: payload.id,
      quantity: payload.quantity,
      properties: payload.properties,
    },
  })
);

export const changeItemByLine = cartActionTemplate(
  'changeItemByLine',
  (apis, payload) =>
    apis.changeItem({
      data: { line: payload.line, quantity: payload.quantity },
    })
);

export const changeItemByKey = cartActionTemplate(
  'changeItemByKey',
  (apis, payload) =>
    apis.changeItem({
      data: { id: payload.key, quantity: payload.quantity },
    })
);

export const removeItemByLine = cartActionTemplate(
  'removeItemByLine',
  (apis, payload) =>
    apis.changeItem({
      data: { line: payload, quantity: 0 },
    })
);

export const removeItemByKey = cartActionTemplate(
  'removeItemByKey',
  (apis, payload) =>
    apis.changeItem({
      data: { id: payload, quantity: 0 },
    })
);

export const updateCartFromForm = cartActionTemplate(
  'updateCartFromForm',
  (apis, payload) =>
    apis.updateCart({
      data: new FormData(payload),
    })
);

export const updateCartAttributes = cartActionTemplate(
  'updateCartAttributes',
  (apis, payload) =>
    apis.updateCart({
      data: { attributes: payload },
    })
);

export const updateCartNote = cartActionTemplate(
  'updateCartNote',
  (apis, payload) =>
    apis.updateCart({
      data: { note: payload },
    })
);

export const clearCart = cartActionTemplate('clearCart', (apis) =>
  apis.clearCart()
);

export const changeCollectionCurrentTags = collectionActionTemplate(
  'changeCollectionCurrentTags',
  'current_tags'
);

export const changeCollectionPage = collectionActionTemplate(
  'changeCollectionPage',
  'page'
);

export const changeCollectionSortBy = collectionActionTemplate(
  'changeCollectionSortBy',
  'sort_by'
);

export const changeCollectionViewType = (context, payload) => {
  if (context.state.collection) {
    context.commit('setCollectionViewType', payload);
  }
};

export default {
  changeCollectionCurrentTags,
  changeCollectionPage,
  changeCollectionSortBy,
  changeCollectionViewType,
};

// export const initiate = (context, payload) => {
//   context.commit('setCartIsUpdating', true);
//   apis.getCart().then((cart) => {
//     context.commit('setCart', cart);
//     context.commit('setCartIsUpdating', false);
//   });
//   if (context.state.collection !== undefined) {
//     context.commit('setCartIsUpdating', true);
//     context.commit('setCollectionIsUpdating', true);
//     let current_tags;
//     let handle;
//     let page;
//     let sort_by;
//     let params;
//     let search_params;
//     const current_page_url =
//       window.themeName &&
//       window[window.themeName] &&
//       window[window.themeName].canonical_url
//         ? window[window.themeName].canonical_url
//         : window.location.href;

//     handle = new URL(current_page_url).pathname.split('/')[2];
//     search_params = new URL(current_page_url).searchParams;
//     params = {};
//     if (handle === 'types' || handle === 'vendors') {
//       params.q = search_params.get('q');
//       search_params.get('constraint') &&
//         (params.constraint = search_params.get('constraint'));
//     } else {
//       new URL(current_page_url).pathname.split('/').length > 3 &&
//         (current_tags = new URL(current_page_url).pathname.split('/')[3]);
//     }
//     search_params.get('page') && (params.page = search_params.get('page'));
//     search_params.get('sort_by') &&
//       (params.sort_by = search_params.get('sort_by'));

//     apis
//       .getCollection({
//         handle,
//         view: 'theme',
//         params,
//         current_tags,
//       })
//       .then((collection) => {
//         return collectionTransformFns.reduce((p, fn) => {
//           return p.then(fn);
//         }, Promise.resolve(collection));
//       })
//       .then((collection) => {
//         context.commit('setCollection', collection);
//         context.commit('setCollectionIsUpdating', false);
//       });
//   }
// };
