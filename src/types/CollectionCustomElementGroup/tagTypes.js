/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const collectionProductsList = {
  observedAttributes: [
    'products',
    'view_type',
    'is_main',
    'page',
    'title',
    'sort_by',
    'handle',
    'current_tags',
  ],
  hook: (id, helpers) => (store) => (element) => {
    const { useEffect, capitalize } = helpers;
    const {
      products: rawProducts,
      view_type: rawViewType,
      is_main: rawIsMain,
      page: rawPage,
      title: rawTitle,
      sort_by: rawSortBy,
      handle: rawHandle,
      current_tags: rawCurrentTags,
    } = element;
    const products = JSON.parse(rawProducts || '[]');
    const viewType = ['grid', 'list'].includes(rawViewType)
      ? rawViewType
      : 'grid';
    const isMain = rawIsMain != null;
    const page =
      Number.isNaN(parseInt(rawPage, 10)) || parseInt(rawPage, 10) < 1
        ? 1
        : rawPage;
    const title = rawTitle;
    const sortBy = [
      'manual',
      'best-selling',
      'title-ascending',
      'title-descending',
      'price-ascending',
      'price-descending',
      'created-ascending',
      'created-descending',
    ].includes(rawSortBy)
      ? rawSortBy
      : null;
    const handle = rawHandle;
    const currentTags = rawCurrentTags;
    useEffect(() => {
      store.dispatch(`initiate${capitalize(id)}Collection`, {
        is_main: isMain,
        page,
        title,
        sort_by: sortBy,
        handle,
        current_tags: currentTags,
      });
    }, []);
    return [products, viewType, handle];
  },
};

const collectionProductGridItem = {
  observedAttributes: ['product', 'view_type'],
  hook: (id, helpers) => (store) => (element) => {
    // todo finish hook for collectionProductGridItem
    const { useEffect, capitalize } = helpers;
    const { product, view_type } = element;
    const collection_handle = element.getAttribute('collection_handle');
    const product_index = element.getAttribute('product_index');
    return [product, view_type, collection_handle, product_index];
  },
};

const collectionProductListItem = {
  observedAttributes: ['product', 'view_type'],
  hook: (id, helpers) => (store) => (element) => {
    // todo finish hook for collectionProductGridItem
    const { useEffect, capitalize } = helpers;
    const { product, view_type, collection_handle, product_index } = element;
    return [product, view_type, collection_handle, product_index];
  },
};

const collectionTags = {
  observedAttributes: ['current_tags', 'all_tags', 'tags'],
  hook: (id, helpers) => (store) => (element) => {
    const { useEffect, capitalize } = helpers;
    const {
      current_tags: rawCurrentTags,
      all_tags: rawAllTags,
      tags: rawTags,
    } = element;
    const currentTags =
      !rawCurrentTags || rawCurrentTags === true
        ? []
        : rawCurrentTags.split('+');
    const allTags =
      !rawAllTags || rawAllTags === true ? [] : JSON.parse(rawAllTags);
    const tags = !rawTags || rawTags === true ? [] : rawTags.split(',');
    const onCurrentTagsChanged = (e) => {
      store.dispatch(
        `change${capitalize(id)}CollectionCurrentTags`,
        e.target.value
      );
    };
    return [currentTags, allTags, tags, { onCurrentTagsChanged }];
  },
};

const collectionBreadcrumb = {
  observedAttributes: ['current_tags'],
  hook: (id, helpers) => (store) => (element) => {},
};

const collectionPagination = {
  observedAttributes: ['paginate'],
  hook: (id, helpers) => (store) => (element) => {
    const { capitalize } = helpers;
    const { paginate: rawPaginate } = element;
    const paginate = JSON.parse(rawPaginate || '{}');

    const gotoPreviousPage = (e) => {
      e.preventDefault();
      if (paginate && paginate.current_page && paginate.current_page > 1) {
        store.dispatch(
          `change${capitalize(id)}CollectionPage`,
          paginate.current_pagent - 1
        );
        window.scrollTo(0, 0);
      }
    };

    const gotoNextPage = (e) => {
      e.preventDefault();
      if (
        paginate &&
        paginate.current_page &&
        paginate.current_page < paginate.pages
      ) {
        store.dispatch(
          `change${capitalize(id)}CollectionPage`,
          paginate.current_page + 1
        );
        window.scrollTo(0, 0);
      }
    };

    const gotoThisPage = (e) => {
      e.preventDefault();
      const targetPage = parseInt(e.target.dataset.value, 10);
      if (Number.isInteger(targetPage)) {
        store.dispatch(`change${capitalize(id)}CollectionPage`, targetPage);
        window.scrollTo(0, 0);
      }
    };

    return [paginate, { gotoNextPage, gotoPreviousPage, gotoThisPage }];
  },
};

const collectionSorting = {
  observedAttributes: ['sort_by', 'sort_options'],
  hook: (id, helpers) => (store) => (element) => {
    const { capitalize } = helpers;
    const { sort_by: rawSortBy, sort_options: rawSortOptions } = element;
    const sortBy = rawSortBy;
    const sortOptions = JSON.parse(rawSortOptions || null);
    const onSortByChanged = (e) => {
      store.dispatch(`change${capitalize(id)}CollectionSortBy`, e.target.value);
    };
    return [sortBy, sortOptions, { onSortByChanged }];
  },
};

export default {
  'collection-products-list': collectionProductsList,
  'collection-product-grid-item': collectionProductGridItem,
  'collection-product-list-item': collectionProductListItem,
  'collection-tags': collectionTags,
  'collection-pagination': collectionPagination,
  'collection-sorting': collectionSorting,
};
