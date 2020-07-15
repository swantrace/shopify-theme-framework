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
    return html`<div class="header-bar__module">
        <span class="header-bar__sep" aria-hidden="true"></span>
        <a href="{{ routes.cart_url }}" class="cart-page-link">
          <span
            class="icon icon-cart header-bar__cart-icon"
            aria-hidden="true"
          ></span>
        </a>
      </div>

      <div class="header-bar__module">
        <a href="{{ routes.cart_url }}" class="cart-page-link">
          {{ 'layout.cart.title' | t }}{% unless cart.item_count == 0 %}:{%
          endunless %}
          <span
            class="cart-count header-bar__cart-count{% if cart.item_count == 0 %} hidden-count{% endif %}"
          >
            {{ cart.item_count }}
          </span>
        </a>
      </div>`;
  },
};
