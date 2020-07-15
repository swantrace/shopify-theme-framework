/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, escapeStr } = helpers;
    return html`${settings.header.logo
      ? html`<noscript>
            <div class="logo__image-wrapper">
              <img
                src="${settings.header.logo.replace(
                  '_1x1',
                  `_${settings.header.logoWidth}x`
                )}"
                alt="${shopify.shopName}"
              />
            </div>
          </noscript>
          <div class="logo__image-wrapper supports-js">
            <a
              href="${shopify.routes.rootURL}"
              itemprop="url"
              style="padding-top:${(1 / settings.header.logo.aspect_ratio) *
              100}%;"
            >
              <img
                class="logo__image lazyload"
                src="${settings.header.logo.replace('_1x1', '_300x300')}"
                data-src="${settings.header.logo.replace('_1x1', '_{width}x')}"
                data-widths="[120, 180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2048]"
                data-aspectratio="${settings.header.logo.aspect_ratio}"
                data-sizes="auto"
                alt="${escapeStr(shopify.shopName)}"
                itemprop="logo"
              />
            </a>
          </div>`
      : html` <a href="${shopify.routes.rootURL}" itemprop="url">
          ${shopify.shopName}
        </a>`}`;
  },
};
