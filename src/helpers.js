/**
 * @file includes all the helper functions required by other files
 */
import slugify from 'slugify';

/**
 * escapes a string, similar with shopify's escape filter
 * @param {string} str The string to be handled
 * @returns escaped string
 */
export const escapeStr = (str) =>
  str.replace(
    /[\u00A0-\u017e\u0180-\u9999]/gim,
    (i) => `&#${i.charCodeAt(0)};`
  );

/**
 * handleizes a string, similar with shopify's handle filter
 * @param {string} str The string to be handled
 * @returns handleized string
 */
export const handleize = (str) =>
  slugify(str.replace(/[^0-9a-zA-Z_]/g, ' '), {
    replacement: '-',
    lower: true,
  });

/**
 * creates an array of consecutive integers from start to end
 * @param {number} start from which the array starts
 * @param {number} end with which the array ends
 */
export const range = (start, end) => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
};

/**
 * @todo the function doesn't work when current_tags is 'all'
 * @todo the function should be moved to another place
 */
export const adjustCollectionPageURL = (url, params, currentTags, handle) => {
  let newUrl = '';
  if (handle === 'types' || handle === 'vendors') {
    newUrl = `${url.split('?')[0]}?q=${params.q}`;
    if (params.constraint) {
      newUrl += `&constraint=${params.constraint}`;
    }
  } else {
    newUrl = `/collections/${handle}/${currentTags}?`;
  }
  if (params.page) {
    newUrl += `&page=${params.page}`;
  }
  if (params.sort_by) {
    newUrl += `&page=${params.sort_by}`;
  }
  window.history.pushState(null, '', newUrl);
};
