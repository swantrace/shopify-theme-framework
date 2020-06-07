import { escapeStr } from './helpers';

const enableCartIsUpdating = () => {
  document
    .querySelectorAll(`[atc-form], [cart-form]`)
    .forEach((el) => el.setAttribute('cart_is_updating', ''));
};

const disableCartIsUpdating = () => {
  document
    .querySelectorAll(`[atc-form], [cart-form]`)
    .forEach((el) => el.removeAttribute('cart_is_updating'));
};

const enableCollectionIsUpdating = () => {
  document
    .querySelectorAll(
      `[collection-products-list],[collection-tags-filter],[collection-page-controller],[collection-sort-by-controller],[collection-view-type-controller]`
    )
    .forEach((el) => el.setAttribute('collection_is_updating', ''));
};

const disableCollectionIsUpdating = () => {
  document
    .querySelectorAll(
      `[collection-products-list],[collection-tags-filter],[collection-page-controller],[collection-sort-by-controller],[collection-view-type-controller]`
    )
    .forEach((el) => el.removeAttribute('collection_is_updating'));
};

const setCartAttribute = (newValue, oldValue) => {
  document.querySelectorAll(`[cart-form]`).forEach((el) => {
    el.setAttribute('old_cart_json', escapeStr(JSON.stringify(oldValue)));
    el.setAttribute('cart_json', escapeStr(JSON.stringify(newValue)));
  });
};

const setCollectionTagsFilterAttribute = (newValue) => {
  document.querySelectorAll(`[collection-tags-filter]`).forEach((el) => {
    el.setAttribute('current_tags', newValue.current_tags);
    el.setAttribute('tags', newValue.tags);
    el.setAttribute('all_tags', escapeStr(JSON.stringify(newValue.all_tags)));
  });
};

const setCollectionPageControllerAttribute = (newValue) => {
  document.querySelectorAll(`[collection-page-controller]`).forEach((el) => {
    el.setAttribute('current_page', newValue.page);
    el.setAttribute('products_count', newValue.products_count);
    el.setAttribute('items_per_page', newValue.items_per_page);
  });
};

const setCollectionSortByControllerAttribute = (newValue) => {
  document.querySelectorAll(`[collection-sort-by-controller]`).forEach((el) => {
    el.setAttribute('sort_by', newValue.sort_by);
    el.setAttribute(
      'sort_options',
      escapeStr(JSON.stringify(newValue.sort_options))
    );
  });
};

const setCollectionViewTypeControllerAttribute = (newValue) => {
  document
    .querySelectorAll(
      `[collection-view-type-controller], [collection-products-list]`
    )
    .forEach((el) => {
      el.setAttribute('view_type', newValue.view_type);
    });
};

const setCollectionProductsListAttribute = (newValue) => {
  document.querySelectorAll(`[collection-products-list]`).forEach((el) => {
    el.setAttribute('product_handles', newValue.products);
  });
};

export {
  enableCartIsUpdating,
  disableCartIsUpdating,
  setCartAttribute,
  enableCollectionIsUpdating,
  disableCollectionIsUpdating,
  setCollectionTagsFilterAttribute,
  setCollectionPageControllerAttribute,
  setCollectionSortByControllerAttribute,
  setCollectionViewTypeControllerAttribute,
  setCollectionProductsListAttribute,
};
