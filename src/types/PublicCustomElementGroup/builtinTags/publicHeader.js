/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, unsafeHTML } = helpers;

    const headerStyle = `<style>
      .log__image-wrapper {
        max-width: ${settings.header.logoWidth}px;
      }
      ${
        settings.header.show_header_lines
          ? `
        .site-nav {
          ${
            settings.header.show_header_lines
              ? `
            border-top: 1px solid ${settings.global.color_borders};
            border-bottom: 1px solid ${settings.global.color_borders};
          `
              : ``
          }
          margin-top: 30px;
        }
        ${
          !settings.header.left_aligned_logo
            ? `
          .logo__image-wrapper {
            margin: 0 auto;
          }
        `
            : ``
        }
      `
          : ``
      }
      ${
        !settings.header.nav_below_logo && settings.header.show_header_lines
          ? `
          .site-header .grid-full {
            border-bottom: 1px solid ${settings.global.color_borders}；
            padding-bottom: 30px;
          }
      `
          : ``
      }
      ${
        !settings.header.nav_below_logo
          ? `
          @media screen and (min-width: 769px) {
            .site-nav {
              text-align: right!important;
            }
          }
      `
          : ``
      }
    </style>`;

    return html`${unsafeHTML(headerStyle)}
      <div
        data-section-id="${settings.header.id}"
        data-section-type="header-section"
      >
        <div class="header-bar">
          <div class="wrapper medium-down--hide">
            <div class="post-large--display-table">
              ${settings.header.show_social_links ||
              settings.header.show_announcement ||
              settings.header.header_search_enable
                ? html` <div
                    class="header-bar__left post-large--display-table-cell"
                  >
                    ${settings.header.show_social_links
                      ? html`<main-public-social-links
                          class="header-bar__module header-bar__module--list"
                        ></main-public-social-links>`
                      : html``}
                    ${settings.header.show_announcement
                      ? html` <main-public-announcement-bar
                          class="header-bar__module header-bar__message"
                        ></main-public-announcement-bar>`
                      : html`${settings.header.header_search_enable
                          ? html`
                              <main-public-search-bar
                                class="header-bar__module header-bar__search"
                              ></main-public-search-bar>
                            `
                          : html``}`}
                  </div>`
                : html``}
              <div class="header-bar__right post-large--display-table-cell">
                ${shopify.shopCustomerAccountsEnabled
                  ? html`<main-public-customer-account></main-public-customer-account>`
                  : html``}
                ${settings.header.header_search_enabled &&
                settings.header.show_announcement
                  ? html` <main-public-search-bar
                      class="header-bar__module header-bar__search"
                    ></main-public-search-bar>`
                  : html``}
                <main-public-cart-icon></main-public-cart-icon>
              </div>
            </div>
          </div>
          <div class="wrapper post-large--hide announcement-bar--mobile">
            ${settings.header.show_announcement
              ? html`<main-public-announcement-bar></main-public-announcement-bar>`
              : html``}
          </div>
          <div class="wrapper post-large--hide">
            ${settings.header.nav_menu &&
            settings.header.header_search_enabled &&
            shopify.shopCustomerAccountsEnabled
              ? html` <button
                  type="button"
                  class="mobile-nav-trigger"
                  id="MobileNavTrigger"
                  aria-controls="MobileNav"
                  aria-expanded="false"
                >
                  <span class="icon icon-hamburger" aria-hidden="true"></span>
                  ${locales[locales.currentLanguage].layout.navigation.menu}
                </button>`
              : html``}
            <main-public-mobile-cart-icon></main-public-mobile-cart-icon>
          </div>
          <main-public-mobile-navigation></main-public-mobile-navigation>
        </div>

        <header class="site-header" role="banner">
          <main-public-navigation></main-public-navigation>
        </header>
      </div>`;
  },
};
