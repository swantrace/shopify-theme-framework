import odiff from 'odiff';
import { escapeStr } from '../../helpers';

export default (key, collection, oldCollection) => {
  const diffPaths = odiff(oldCollection, collection).map(
    (diff) => diff.path[0]
  );
  const id = key.replace('Collection', '');
  const collectionProductsListTagName = `${id}-collection-products-list`;
  const collectionTagsTagName = `${id}-collection-tags`;
  const collectionPaginationTagName = `${id}-collection-pagination`;
  const collectionSortingTagName = `${id}-collection-sorting`;
  const collectionBreadcrumbTagName = `${id}-collection-breadcrumb`;

  if (
    diffPaths.includes('products') ||
    diffPaths.includes('view_type') ||
    diffPaths.includes('handle')
  ) {
    document
      .querySelectorAll(collectionProductsListTagName)
      .forEach((element) => {
        element.setAttribute(
          'products',
          escapeStr(JSON.stringify(collection.products))
        );
        element.setAttribute('view_type', collection.view_type);
        element.setAttribute('handle', collection.handle);
      });
  }

  if (
    diffPaths.includes('current_tags') ||
    diffPaths.includes('all_tags') ||
    diffPaths.includes('tags')
  ) {
    document
      .querySelectorAll(
        `${collectionTagsTagName}, ${collectionBreadcrumbTagName}`
      )
      .forEach((element) => {
        element.setAttribute('current_tags', collection.current_tags);
        element.setAttribute('tags', collection.tags);
        element.setAttribute(
          'all_tags',
          escapeStr(JSON.stringify(collection.all_tags))
        );
      });
  }

  if (diffPaths.includes('sort_by') || diffPaths.includes('sort_options')) {
    document.querySelectorAll(collectionSortingTagName).forEach((element) => {
      element.setAttribute('sort_by', collection.sort_by);
      element.setAttribute(
        'sort_options',
        JSON.stringify(collection.sort_options)
      );
    });
  }

  if (diffPaths.includes('paginate')) {
    document
      .querySelectorAll(collectionPaginationTagName)
      .forEach((element) => {
        element.setAttribute(
          'paginate',
          escapeStr(JSON.stringify(collection.paginate))
        );
      });
  }
};
