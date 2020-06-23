/* eslint-disable camelcase */
/**
 * @file include all the possible actions which can be triggered by website users
 */
import mapLimit from 'async.maplimit';
import {
  dispatchAjaxDoneEvent,
  dispatchAjaxFailEvent,
  transformObject,
  capitalize,
} from '../../helpers';
/**
 *
 * @param {*} context
 * @param {*} actionName
 */
const handleCollectionAjaxDone = (context, actionName) => (id) => (
  collection
) => {
  context.commit(`setCollectionIsUpdating`, false);
  dispatchAjaxDoneEvent(
    actionName.replace('Collection', `${capitalize(id)}Collection`),
    collection
  );
  return collection;
};
/**
 *
 * @param {*} context
 * @param {*} actionName
 */
const handleCollectionAjaxFail = (context, actionName) => (id) => (error) => {
  context.commit(`setCollectionIsUpdating`, false);
  dispatchAjaxFailEvent(
    actionName.replace('Collection', `${capitalize(id)}Collection`),
    error
  );
  return false;
};

/**
 *
 * @param {*} actionName
 * @todo rebuild the function to get new url making use of canonicalUrl and payload
 */
const collectionActionTemplate = (actionName, collectionPropertyName) => (
  id,
  apis,
  transformFns
) => (context, payload) => {
  let params;
  let tmp1 = context.state[`${id}Collection`];
  tmp1 = { ...tmp1, [collectionPropertyName]: payload };
  context.commit(
    actionName.replace('[id]', capitalize(id)).replace('change', 'set'),
    payload
  );
  context.commit(`setCollectionIsUpdating`, true);
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
    .then(transformObject(transformFns.collection))
    .then((collection) => {
      context.commit(`set${capitalize(id)}Collection`, collection);
      context.commit(`clean${capitalize(id)}CollectionProducts`);
      return collection;
    })
    .then((collection) => {
      const productsHandles = collection.products_handles;
      const tmp2 = collection;
      let productsCount = productsHandles.length;
      let tmpProducts = [];
      return new Promise((resolve, reject) => {
        mapLimit(
          productsHandles,
          5,
          (productHandle, callback) => {
            apis
              .getProduct({
                view: 'theme',
                handle: productHandle,
              })
              .then(transformObject(transformFns.product))
              .then((product) => {
                productsCount -= 1;
                tmpProducts.push(product);
                if (tmpProducts.length === 5 || productsCount === 0) {
                  context.commit(
                    `add${capitalize(id)}CollectionProducts`,
                    tmpProducts
                  );
                  tmpProducts = [];
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
    .then(
      handleCollectionAjaxDone(
        context,
        actionName.replace('[id]', capitalize(id))
      )
    )
    .catch(
      handleCollectionAjaxFail(
        context,
        actionName.replace('[id]', capitalize(id))
      )
    );
};

export const changeCollectionCurrentTags = collectionActionTemplate(
  'change[id]CollectionCurrentTags',
  'current_tags'
);

export const changeCollectionPage = collectionActionTemplate(
  'change[id]CollectionPage',
  'page'
);

export const changeCollectionSortBy = collectionActionTemplate(
  'change[id]CollectionSortBy',
  'sort_by'
);

export const changeCollectionViewType = (id) => (context, payload) => {
  context.commit(`set${capitalize(id)}CollectionViewType`, payload);
};

export const initiateCollection = (id, apis, transformFns, shopify) => (
  context,
  payload
) => {
  const { is_main, page, title, sort_by } = payload;
  let { handle, current_tags } = payload;
  let params;
  const { canonicalURL } = shopify;
  const tmp1 = context.state[`${id}Collection`];
  if (is_main) {
    [, , handle, current_tags] = new URL(canonicalURL).pathname.split('/');
    tmp1.handle = handle;
    tmp1.current_tags = current_tags;
    const search_params = new URL(canonicalURL).searchParams;
    if (handle === 'types' || handle === 'vendors') {
      tmp1.title = search_params.get('q');
      if (search_params.get('constraint')) {
        tmp1.current_tags = search_params.get('constraint');
      }
    }
    if (search_params.get('page')) {
      tmp1.page = search_params.get('page');
    } else {
      tmp1.page = page;
    }
    if (search_params.get('sort_by')) {
      tmp1.sort_by = search_params.get('sort_by');
    } else {
      tmp1.sort_by = sort_by;
    }
  } else {
    if (handle) {
      tmp1.handle = handle;
    }
    if (current_tags) {
      tmp1.current_tags = current_tags;
    }
    if (page) {
      tmp1.page = page;
    }
    if (title) {
      tmp1.title = title;
    }
    if (sort_by) {
      tmp1.sort_by = sort_by;
    }
  }

  context.commit(
    `set${capitalize(id)}CollectionCurrentTags`,
    tmp1.current_tags
  );
  context.commit(`set${capitalize(id)}CollectionPage`, tmp1.page);
  context.commit(`set${capitalize(id)}CollectionSortBy`, tmp1.sort_by);
  context.commit(`setCollectionIsUpdating`, true);
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
    .then(transformObject(transformFns.collection))
    .then((collection) => {
      context.commit(`set${capitalize(id)}Collection`, collection);
      return collection;
    })
    .then((collection) => {
      const productsHandles = collection.products_handles;
      const tmp2 = collection;
      let productsCount = productsHandles.length;
      let tmpProducts = [];
      return new Promise((resolve, reject) => {
        mapLimit(
          productsHandles,
          5,
          (productHandle, callback) => {
            apis
              .getProduct({
                view: 'theme',
                handle: productHandle,
              })
              .then(transformObject(transformFns.product))
              .then((product) => {
                productsCount -= 1;
                tmpProducts.push(product);
                if (tmpProducts.length === 5 || productsCount === 0) {
                  context.commit(
                    `add${capitalize(id)}CollectionProducts`,
                    tmpProducts
                  );
                  tmpProducts = [];
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
    .then(
      handleCollectionAjaxDone(context, `initiate${capitalize(id)}Collection`)
    )
    .catch(
      handleCollectionAjaxFail(context, `initiate${capitalize(id)}Collection`)
    );
};

export default {
  'change[id]CollectionCurrentTags': changeCollectionCurrentTags,
  'change[id]CollectionPage': changeCollectionPage,
  'change[id]CollectionSortBy': changeCollectionSortBy,
  'change[id]CollectionViewType': changeCollectionViewType,
  'initiate[id]Collection': initiateCollection,
};
