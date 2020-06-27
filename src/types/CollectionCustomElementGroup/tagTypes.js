import { useEffect } from 'haunted';
import { capitalize } from '../../helpers';

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
  hook: (id) => (store) => (element) => {
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
    return [products, viewType];
  },
};

const collectionProductGridItem = {
  observedAttributes: ['product', 'view_type'],
  hook: (id) => (store) => (element) => {
    // todo finish hook for collectionProductGridItem
    console.log(store, id);
    const { product } = element;
    return [product];
  },
};

const collectionProductListItem = {
  observedAttributes: ['product', 'view_type'],
  hook: (id) => (store) => (element) => {
    // todo finish hook for collectionProductListItem
    console.log(store, id);
    const { product } = element;
    return [product];
  },
};

const collectionTags = {
  observedAttributes: ['current_tags', 'all_tags', 'tags'],
  hook: (id) => (store) => (element) => {
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

const collectionPagination = {
  observedAttributes: ['current_page', 'products_count', 'items_per_page'],
  hook: (id) => (store, apis, helpers) => (element) => {
    const {
      current_page: rawCurrentPage,
      products_count: rawProductsCount,
      items_per_page: rawItemsPerPage,
    } = element;
    const currentPage = parseInt(rawCurrentPage || 1, 10);
    const productsCount = parseInt(rawProductsCount || 0, 10);
    const itemsPerPage = parseInt(rawItemsPerPage || 20, 10);
    const totalPageNumber =
      productsCount && itemsPerPage
        ? Math.ceil(productsCount / itemsPerPage)
        : 0;

    const pageRange = helpers.range(1, totalPageNumber);

    const gotoPreviousPage = (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        store.dispatch(
          `change${capitalize(id)}CollectionPage`,
          currentPage - 1
        );
      }
    };

    const gotoNextPage = (e) => {
      e.preventDefault();
      if (currentPage < totalPageNumber) {
        store.dispatch(
          `change${capitalize(id)}CollectionPage`,
          currentPage + 1
        );
      }
    };

    const gotoThisPage = (e) => {
      e.preventDefault();
      const targetPage = e.target.dataset.value;
      store.dispatch(
        `change${capitalize(id)}CollectionPage`,
        parseInt(targetPage, 10)
      );
    };

    return [
      currentPage,
      totalPageNumber,
      pageRange,
      { gotoNextPage, gotoPreviousPage, gotoThisPage },
    ];
  },
};

const collectionSorting = {
  observedAttributes: ['sort_by', 'sort_options'],
  hook: (id) => (store) => (element) => {
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
