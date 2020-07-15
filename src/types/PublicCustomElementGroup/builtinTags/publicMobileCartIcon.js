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
    const [cart] = hook(element);
    return html`<a
      href="${shopify.routes.cartURL}"
      class="cart-page-link mobile-cart-page-link"
    >
      <span
        class="icon icon-cart header-bar__cart-icon"
        aria-hidden="true"
      ></span>
      ${locales[locales.currentLanguage].layout.cart.title}
      <span
        class="cart-count${cart.item_count === 0
          ? html` hidden-count`
          : html``}"
        >${cart.item_count}
      </span>
    </a>`;
  },
};
