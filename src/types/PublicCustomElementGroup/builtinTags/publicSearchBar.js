/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html } = helpers;
    return html`{% if search-bar == 'header' %}
      <form
        action="{{ routes.search_url }}"
        method="get"
        class="header-bar__search-form clearfix"
        role="search"
      >
        {% comment %}<input type="hidden" name="type" value="product" />{%
        endcomment %}
        <button
          type="submit"
          class="btn btn--search icon-fallback-text header-bar__search-submit"
        >
          <span class="icon icon-search" aria-hidden="true"></span>
          <span class="fallback-text" data-t="general.search.submit">
            {{ 'general.search.submit' | t }}
          </span>
        </button>
        <input
          type="search"
          name="q"
          value="{{ search.terms | escape }}"
          aria-label="{{ 'general.search.placeholder' | t }}"
          class="header-bar__search-input"
          placeholder="{{ 'general.search.placeholder' | t }}"
        />
      </form>
      {% else %}
      <form
        action="{{ routes.search_url }}"
        method="get"
        class="input-group search-bar"
        role="search"
      >
        {% comment %}<input
          type="hidden"
          name="type"
          value="product"
        />{%endcomment %}
        <input
          type="search"
          name="q"
          value="{{ search.terms | escape }}"
          placeholder="{{ 'general.search.placeholder' | t }}"
          class="input-group-field"
          aria-label="{{ 'general.search.placeholder' | t }}"
          placeholder="{{ 'general.search.placeholder' | t }}"
        />
        <span class="input-group-btn">
          <button type="submit" class="btn btn--search icon-fallback-text">
            <span class="icon icon-search" aria-hidden="true"></span>
            <span class="fallback-text" data-t="general.search.submit">
              {{ 'general.search.submit' | t }}
            </span>
          </button>
        </span>
      </form>
      {% endif %} `;
  },
};
