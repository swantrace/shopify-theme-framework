export const setCart = (state, payload) => {
  state.cart = {
    attributes: payload.attributes,
    cart_level_discount_applications: payload.cart_level_discount_applications,
    currency: payload.currency,
    item_count: payload.item_count,
    items: payload.items,
    items_subtotal_price: payload.items_subtotal_price,
    note: payload.note,
    original_total_price: payload.original_total_price,
    requires_shipping: payload.requires_shipping,
    token: payload.token,
    total_discount: payload.total_discount,
    total_price: payload.total_price,
    total_weight: payload.total_weight,
  };
  return state;
};

export const setCollection = (state, payload) => {
  state.collection = {
    ...state.collection,
    all_products_count: payload.all_products_count,
    all_tags: payload.all_tags,
    all_types: payload.all_types,
    all_vendors: payload.all_vendors,
    current_tags: payload.current_tags,
    current_type: payload.current_type,
    current_vendor: payload.current_vendor,
    default_sort_by: payload.default_cort_by,
    description: payload.description,
    disjunctive: payload.disjunctive,
    handle: payload.handle,
    id: payload.id,
    image: payload.image,
    page: payload.page,
    products_count: payload.products_count,
    products_handles: payload.products_handles,
    published_at: payload.published_at,
    published_scope: payload.published_scope,
    sort_by: payload.sort_by,
    tags: payload.tags,
    template_suffix: payload.suffix,
    title: payload.title,
    updated_at: payload.updated_at,
    view_type: payload.view_type,
  };
  return state;
};

export const setCollectionCurrentTags = (state, payload) => {
  console.log('setCollectionCurrentTags\n');
  state.collection = { ...state.collection, current_tags: payload };
  return state;
};

export const setCollectionPage = (state, payload) => {
  console.log('setCollectionCurrentPage\n');
  state.collection = { ...state.collection, page: payload };
  return state;
};

export const setCollectionSortBy = (state, payload) => {
  state.collection = { ...state.collection, sort_by: payload };
  return state;
};

export const setCollectionProducts = (state, payload) => {
  state.collection = { ...state.collection, products: payload };
  return state;
};

export const setCollectionViewType = (state, payload) => {
  state.collection = { ...state.collection, view_type: payload };
  return state;
};
