/* eslint-disable no-nested-ternary */
export default (helpers) => ({
  collection: [
    (collection) => ({
      ...collection,
      all_tags: helpers.handliezeTags(collection.all_tags),
      tags: helpers.handliezeTags(collection.tags),
      current_tags: helpers.concatTags(collection.current_tags),
    }),
  ],
  product: [],
  search: [
    (search) => ({
      ...search,
      search_results: search.search_results.map((result) => ({
        ...result,
        object_type: result.blog_id
          ? 'article'
          : result.price
          ? 'product'
          : 'page',
      })),
    }),
  ],
  blog: [
    (blog) => ({
      ...blog,
      all_tags: helpers.handliezeTags(blog.all_tags),
      tags: helpers.handliezeTags(blog.tags),
      current_tags: helpers.concatTags(blog.current_tags),
    }),
  ],
  cart: [],
  customer: [],
  article: [],
  page: [],
});
