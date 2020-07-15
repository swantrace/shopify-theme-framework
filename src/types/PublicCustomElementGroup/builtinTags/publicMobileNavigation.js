/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, escapeStr, unsafeHTML } = helpers;
    const mobileNavIcons = `
    <span class="icon-fallback-text mobile-nav__sublist-expand" aria-hidden="true">
      <span class="icon icon-plus" aria-hidden="true"></span>
      <span class="fallback-text">+</span>
    </span>
    <span class="icon-fallback-text mobile-nav__sublist-contract" aria-hidden="true">
      <span class="icon icon-minus" aria-hidden="true"></span>
      <span class="fallback-text">-</span>
    </span>`;
    window.linklists = shopify.linklists[settings.header.nav_menu];
    return html`<nav role="navigation">
      <ul id="MobileNav" class="mobile-nav post-large--hide">
        ${shopify.linklists[settings.header.nav_menu].links.map(
          (link, index) =>
            html`${link.links.length > 0
              ? html`<li class="mobile-nav__link a" aria-haspopup="true">
                  <a
                    href="${link.url}"
                    class="mobile-nav__sublist-trigger"
                    aria-controls="MobileNav-Parent-${index}"
                    aria-expanded="false"
                  >
                    ${escapeStr(link.title)} ${unsafeHTML(mobileNavIcons)}
                  </a>
                  <ul
                    id="MobileNav-Parent-{{ parent_index }}"
                    class="mobile-nav__sublist"
                  >
                    ${link.type === 'collection_link' ||
                    link.type === 'blog_link' ||
                    link.url === shopify.routes.allProductsCollectionURL
                      ? html`<li
                          class="mobile-nav__sublist-link ${
                            link.active ? `site-nav--active` : ``
                          }"
                        >
                          <a
                            href="${link.url}"
                            class="site-nav__link"
                            aria-current="${link.active ? `page` : ``}
                            >{locales[locales.currentLanguage].collections.sorting.all_tags}
                            <span class="visually-hidden"
                              >${escapeStr(link.title)}</span
                            ></a
                          >
                        </li>`
                      : html``}
                    ${link.links.map(
                      (subLink, subIndex) => html`
                        ${subLink.links.length > 0
                          ? html`<li class="mobile-nav__sublist-link">
                              <a
                                href="${subLink.url}"
                                class="mobile-nav__sublist-trigger"
                                aria-controls="MobileNav-Child-${index}-${subIndex}"
                                aria-expanded="false"
                              >
                                ${escapeStr(subLink.title)}
                                ${unsafeHTML(mobileNavIcons)}
                              </a>
                              <ul
                                id="MobileNav-Child-${index}-${subIndex}"
                                class="mobile-nav__sublist mobile-nav__sublist--grandchilds"
                              >
                                ${subLink.links.map(
                                  (grandchildlink, grandchildindex) => html`
                                    <li class="mobile-nav__sublist-link">
                                      <a
                                        href="${grandchildlink.url}"
                                        aria-current="${shopify.requestPageType !==
                                          'index' && grandchildlink.active
                                          ? `page`
                                          : ``}"
                                      >
                                        ${escapeStr(grandchildlink.title)}
                                      </a>
                                    </li>
                                  `
                                )}
                              </ul>
                            </li>`
                          : html`<li class="mobile-nav__sublist-link">
                              <a
                                href="${subLink.url}"
                                aria-current="${shopify.requestPageType !==
                                  'index' && subLink.active
                                  ? `page`
                                  : ``}"
                              >
                                ${escapeStr(subLink.title)}
                              </a>
                            </li>`}
                      `
                    )}
                  </ul>
                </li>`
              : html`<li class="mobile-nav__link b">
                  <a
                    href="${link.url}"
                    class="mobile-nav"
                    aria-current="${shopify.requestPageType !== 'index' &&
                    link.active
                      ? `page`
                      : ``}"
                  >
                    ${escapeStr(link.title)}
                  </a>
                </li>`}`
        )}
      </ul>
    </nav>`;
  },
};
