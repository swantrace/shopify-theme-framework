import slugify from 'slugify';

const throwIfMissing = (name) => {
  throw new Error(`Missing parameter: ${name}`);
};

const encodedStr = (rawStr) =>
  rawStr.replace(/[\u00A0-\u9999<>\&]/gim, (i) => `&#${i.charCodeAt(0)};`);

const handleize = (str) =>
  slugify(str.replace(/[^0-9a-zA-Z_]/g, ' '), {
    replacement: '-',
    lower: true,
  });

const range = (start, end) => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
};

const adjustCollectionPageURL = (params, current_tags, handle) => {
  let new_url = '';
  if (handle === 'types' || handle === 'vendors') {
    new_url = `${location.pathname.split('?')[0]}?q=${params.q}`;
    params.constraint && (new_url += `&constraint=${params.constraint}`);
    params.page && (new_url += `&page=${params.page}`);
    params.sort_by && (new_url += `&page=${params.sort_by}`);
  } else {
    new_url = `/collections/${handle}/${current_tags}?`;
    params.page && (new_url += `&page=${params.page}`);
    params.sort_by && (new_url += `&sort_by=${params.sort_by}`);
  }
  window.history.pushState(null, '', new_url);
};

window[window.themeName].helpers = {
  throwIfMissing,
  encodedStr,
  handleize,
  range,
  adjustCollectionPageURL,
};

export {
  throwIfMissing,
  encodedStr,
  handleize,
  range,
  adjustCollectionPageURL,
};
