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

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * @todo the function doesn't work when current_tags is 'all'
 * @todo the function should be moved to another place
 */
export const adjustCollectionPageURL = ({
  handle,
  params,
  currentTags,
  defaultSortBy,
}) => {
  let newUrl = '';
  if (handle === 'types' || handle === 'vendors') {
    newUrl = `/collections/${handle}?q=${params.q}&`;
    if (params.constraint) {
      newUrl += `constraint=${params.constraint}&`;
    }
  } else {
    newUrl = currentTags
      ? `/collections/${handle}/${currentTags}?`
      : `/collections/${handle}?`;
  }
  if (params.page && params.page !== 1) {
    newUrl += `page=${params.page}&`;
  }
  if (params.sort_by && params.sort_by !== defaultSortBy) {
    newUrl += `sort_by=${params.sort_by}&`;
  }
  if (newUrl[newUrl.length - 1] === '?' || newUrl[newUrl.length - 1] === '&') {
    newUrl = newUrl.substring(0, newUrl.length - 1);
  }
  window.history.pushState(null, '', newUrl);
};

export const dispatchAjaxFailEvent = (source, error) => {
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
export const dispatchAjaxDoneEvent = (source, data) => {
  const event = new CustomEvent('ajaxRequestDone', {
    detail: { data, source },
  });
  document.dispatchEvent(event);
};

/**
 *
 * @param {Array<function>} transformFns
 */
export const transformObject = (transformFns) => (obj) => {
  return transformFns.reduce((p, fn) => {
    return p.then(fn);
  }, Promise.resolve(obj));
};

export default {
  range,
  escapeStr,
  handleize,
  capitalize,
  adjustCollectionPageURL,
  dispatchAjaxDoneEvent,
  dispatchAjaxFailEvent,
  transformObject,
};
