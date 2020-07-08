/**
 * @file includes all the helper functions required by other files
 */
import slugify from 'slugify';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { html, component, useEffect, useState } from 'haunted';

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

export const formatMoney = (rawCents, format) => {
  let cents;
  if (typeof rawCents === 'string') {
    cents = rawCents.replace('.', '');
  } else {
    cents = rawCents;
  }
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || `\${{amount}}`;

  function defaultOption(opt, def) {
    return typeof opt === 'undefined' ? def : opt;
  }

  function formatWithDelimiters(
    rawNumber,
    rawPrecision,
    rawThousands,
    rawDecimal
  ) {
    const precision = defaultOption(rawPrecision, 2);
    const thousands = defaultOption(rawThousands, ',');
    const decimal = defaultOption(rawDecimal, '.');

    if (Number.isNaN(rawNumber) || rawNumber == null) {
      return 0;
    }

    const number = (rawNumber / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollarPart = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`
    );
    const centPart = parts[1] ? decimal + parts[1] : '';

    return dollarPart + centPart;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
    case 'amount_with_apostrophe_separator':
      value = formatWithDelimiters(cents, 2, "'", '.');
      break;
    default:
  }

  return formatString.replace(placeholderRegex, value);
};

export const handliezeTags = (tags) =>
  (tags || []).map((tag) => {
    return {
      label: tag,
      handle: handleize(tag),
    };
  });

export const concatTags = (tags) =>
  (tags || []).reduce((acc, cur, idx) => {
    let current = acc;
    if (idx > 0) {
      current += '+';
    }
    current += handleize(cur);
    return current;
  }, '');

export const analyzeCollectionPageURL = (pageURL, rootURL) => {
  const pathName = new URL(pageURL).pathname;
  return [
    pathName
      .replace(`${rootURL === '/' ? '' : rootURL}/collections/`, '')
      .split('/')[0],
    pathName
      .replace(`${rootURL === '/' ? '' : rootURL}/collections/`, '')
      .split('/')[1],
  ];
};

export const analyzeBlogPageURL = (pageURL, rootURL) => {
  const pathName = new URL(pageURL).pathname;
  return [
    pathName
      .replace(`${rootURL === '/' ? '' : rootURL}/blogs/`, '')
      .split('/')[0],
    pathName
      .replace(`${rootURL === '/' ? '' : rootURL}/blogs/`, '')
      .split('/')[2],
  ];
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
  formatMoney,
  handliezeTags,
  concatTags,
  unsafeHTML,
  html,
  component,
  useEffect,
  useState,
};
