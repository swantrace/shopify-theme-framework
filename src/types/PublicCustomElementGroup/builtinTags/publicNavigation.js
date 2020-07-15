/* eslint-disable camelcase */
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
    const navContent = `<nav>
    <ul class="site-nav" id="AccessibleNav">
    ${shopify.linklists[settings.header.nav_menu].links.map(
      (link, index) =>
        `${
          link.links.length > 0
            ? `<li
            class="site-nav--has-dropdown ${
              link.active ? 'site-nav--active' : ''
            }"
            aria-haspopup="true">
            <a
              href="${link.url}"
              class="site-nav__link"
              data-meganav-type="parent"
              aria-controls="MenuParent-${index}"
              aria-expanded="false"
              aria-current="${
                shopify.requestPageType !== 'index' && link.active ? `page` : ``
              }">
                ${escapeStr(link.title)}
                <span class="icon icon-arrow-down" aria-hidden="true"></span>
            </a>
            <ul
              id="MenuParent-${index}"
              class="site-nav__dropdown ${
                link.levels === 2 ? 'site-nav--has-grandchildren' : ''
              }"
              data-meganav-dropdown>
              ${link.links.map(
                (childlink, child_index) =>
                  html` ${childlink.links.length > 0
                    ? `<li
                    class="site-nav--has-dropdown site-nav--has-dropdown-grandchild ${
                      childlink.active ? 'site-nav--active' : ''
                    }"
                    aria-haspopup="true">
                    <a
                      href="{{ childlink.url }}"
                      class="site-nav__link"
                      aria-controls="MenuChildren-${index}-${child_index}"
                      data-meganav-type="parent"
                      aria-current="${
                        shopify.requestPageType !== 'index' && childlink.active
                          ? `page`
                          : ``
                      }"
                      tabindex="-1">
                        ${escapeStr(childlink.title)}
                        <span class="icon icon-arrow-down" aria-hidden="true"></span>
                    </a>
                    <ul
                      id="MenuChildren-${index}-${child_index}"
                      class="site-nav__dropdown-grandchild"
                      data-meganav-dropdown>
                      ${childlink.links.map(
                        (grandchildlink, grandchildindex) => `
                                    <li class="${
                                      grandchildlink.active
                                        ? 'site-nav--active'
                                        : ''
                                    }">
                                      <a
                                        href="${grandchildlink.url}"
                                        class="site-nav__link"
                                        data-meganav-type="child"
                                        aria-current="${
                                          shopify.requestPageType !== 'index' &&
                                          grandchildlink.active
                                            ? `page`
                                            : ``
                                        }"
                                      >
                                        ${escapeStr(grandchildlink.title)}
                                      </a>
                                    </li>
                                  `
                      )}
                    </ul>
                  </li>`
                    : `<li class="${
                        childlink.active ? 'site-nav--active' : ''
                      }">
                    <a
                      href="${childlink.url}"
                      class="site-nav__link"
                      data-meganav-type="child"
                      aria-current="${
                        shopify.requestPageType !== 'index' && childlink.active
                          ? `page`
                          : ``
                      }"
                      tabindex="-1">
                      ${escapeStr(childlink.title)}
                    </a>
                  </li>`}`
              )}
            </ul>
          </li>`
            : `<li class="${link.active ? 'site-nav--active' : ''}">
            <a
              href="${link.url}"
              class="site-nav__link"
              data-meganav-type="child"
              aria-current="${
                shopify.requestPageType !== 'index' && link.active ? `page` : ``
              }">
              ${escapeStr(link.title)}
            </a>
          </li>`
        }`
    )}
    </ul>
  </nav>`;
    return html`<div class="wrapper">
      ${settings.header.nav_below_logo
        ? html`<div class="grid--full">
              <div class="grid__item">
                ${shopify.requestPageType === 'index'
                  ? html`<h1
                      class="site-header__logo${!settings.header.logo &&
                      (settings.header.left_aligned_logo ||
                        !settings.header.nav_below_logo)
                        ? ` post-large--left`
                        : ''}"
                      itemscope
                      itemtype="http://schema.org/Organization"
                    >
                      <main-public-logo></main-public-logo>
                    </h1>`
                  : html`<div
                      class="h1 site-header__logo${!settings.header.logo &&
                      (settings.header.left_aligned_logo ||
                        !settings.header.nav_below_logo)
                        ? ` post-large--left`
                        : ''}"
                      itemscope
                      itemtype="http://schema.org/Organization"
                    >
                      <main-public-logo></main-public-logo>
                    </div>`}
              </div>
            </div>
            <div class="grid--full medium-down--hide">
              <div class="grid__item">
                ${unsafeHTML(navContent)}
              </div>
            </div>`
        : html`<div class="grid--full post-large--display-table">
            <div
              class="grid__item post-large--one-third post-large--display-table-cell"
            >
              ${shopify.requestPageType === 'index'
                ? html`<h1
                    class="site-header__logo${!settings.header.logo &&
                    (settings.header.left_aligned_logo ||
                      !settings.header.nav_below_logo)
                      ? ` post-large--left`
                      : ''}"
                    itemscope
                    itemtype="http://schema.org/Organization"
                  >
                    <main-public-logo></main-public-logo>
                  </h1>`
                : html`<div
                    class="h1 site-header__logo${!settings.header.logo &&
                    (settings.header.left_aligned_logo ||
                      !settings.header.nav_below_logo)
                      ? ` post-large--left`
                      : ''}"
                    itemscope
                    itemtype="http://schema.org/Organization"
                  >
                    <main-public-logo></main-public-logo>
                  </div>`}
            </div>
            <div
              class="grid__item post-large--two-thirds post-large--display-table-cell medium-down--hide"
            >
              ${unsafeHTML(navContent)}
            </div>
          </div>`}
    </div>`;
  },
};
