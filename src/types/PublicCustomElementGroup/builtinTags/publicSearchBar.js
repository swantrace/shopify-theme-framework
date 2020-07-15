/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const search = {
      terms: 'only for test',
    };
    const { html, escapeStr } = helpers;
    return html`
      <form
        action="${shopify.routes.searchURL}"
        method="get"
        class="header-bar__search-form clearfix"
        role="search"
      >
        }<input type="hidden" name="type" value="product,page,article" />
        <button
          type="submit"
          class="btn btn--search icon-fallback-text header-bar__search-submit"
        >
          <span class="icon icon-search" aria-hidden="true"></span>
          <span class="fallback-text" data-t="general.search.submit">
            ${locales[locales.currentLanguage].general.search.submit}
          </span>
        </button>
        <input
          type="search"
          name="q"
          value="${escapeStr(search.terms)}"
          aria-label="${locales[locales.currentLanguage].general.search
            .placeholder}"
          class="header-bar__search-input"
          placeholder="${locales[locales.currentLanguage].general.search
            .placeholder}"
        />
      </form>
    `;
  },
};
