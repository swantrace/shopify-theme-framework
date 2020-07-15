/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, escapeStr, unsafeHTML, capitalize } = helpers;
    const rssLink = `${
      settings.global.social_rss_link
        ? `<li>
            <a
              class="icon-fallback-text"
              href="${escapeStr(settings.global.social_rss_link)}"
              title="${locales[
                locales.currentLanguage
              ].layout.footer.social_platform
                .replace('{{ name }}', shopify.shopName)
                .replace('{{ platform }}', 'RSS')}"
              target="_blank"
              aria-describedby="a11y-new-window-external-message"
            >
              <span class="icon icon-twitter" aria-hidden="true"></span>
              <span class="fallback-text">RSS</span>
            </a>
          </li>`
        : ``
    }`;

    return html`<ul class="inline-list social-icons">
      ${[
        'twitter',
        'facebook',
        'pinterest',
        'instagram',
        'snapchat',
        'tumblr',
        'youtube',
        'vimeo',
        'fancy',
      ].map(
        (name) => html`
          ${settings.global[`social_${name}_link`]
            ? html`
                <li>
                  <a
                    class="icon-fallback-text"
                    href="${escapeStr(settings.global[`social_${name}_link`])}"
                    title="${locales[
                      locales.currentLanguage
                    ].layout.footer.social_platform
                      .replace('{{ name }}', shopify.shopName)
                      .replace('{{ platform }}', capitalize(name))}"
                    target="_blank"
                    aria-describedby="a11y-new-window-external-message"
                  >
                    <span class="icon icon-${name}" aria-hidden="true"></span>
                    <span class="fallback-text">${capitalize(name)}</span>
                  </a>
                </li>
              `
            : html``}
        `
      )}
      ${unsafeHTML(rssLink)}
    </ul> `;
  },
};
