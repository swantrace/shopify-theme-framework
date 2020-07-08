/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html, unsafeHTML } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, unsafeHTML } = helpers;
    const currentLocales = locales[locales.currentLanguage];
    const { title } = currentLocales.general['404'];
    const content = currentLocales.general['404'].subtext_html.replace(
      '{{ link }}',
      `${shopify.routes.allProductsCollectionURL}`
    );
    return html`<h1>${unsafeHTML(title)}</h1>
      <p>${unsafeHTML(content)}</p>`;
  },
};
