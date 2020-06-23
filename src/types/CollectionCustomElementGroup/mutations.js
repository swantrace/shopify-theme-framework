export const setCollection = (id) => (state, payload) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    ...payload,
  };
  return state;
};

export const setCollectionCurrentTags = (id) => (state, payload) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    current_tags: payload,
  };
  return state;
};

export const setCollectionPage = (id) => (state, payload) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    page: payload,
  };
  return state;
};

export const setCollectionSortBy = (id) => (state, payload) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    sort_by: payload,
  };
  return state;
};

export const setCollectionViewType = (id) => (state, payload) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    view_type: payload,
  };
  return state;
};

export const addCollectionProducts = (id) => (state, payload) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    products: [...state[`${id}Collection`].products, ...payload],
  };
  return state;
};

export const cleanCollectionProducts = (id) => (state) => {
  state[`${id}Collection`] = {
    ...state[`${id}Collection`],
    products: [],
  };
  return state;
};

export default {
  'set[id]Collection': setCollection,
  'set[id]CollectionCurrentTags': setCollectionCurrentTags,
  'set[id]CollectionPage': setCollectionPage,
  'set[id]CollectionSortBy': setCollectionSortBy,
  'set[id]CollectionViewType': setCollectionViewType,
  'add[id]CollectionProducts': addCollectionProducts,
  'clean[id]CollectionProducts': cleanCollectionProducts,
};
