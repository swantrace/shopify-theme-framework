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
    return html`${settings.header.announcement_link
      ? html`
          <a href="${settings.header.announcement_link}"
            >${settings.header.header_text}</a
          >
        `
      : html`${settings.header.header_text}`}`;
  },
};
