import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { range } from '../../../helpers';

export default {
  demo: ({ html, hook }) => (element) => {
    const [products, viewType] = hook(element);
    return html`<ul>
      <li>products: ${JSON.stringify(products)}</li>
      <li>view_type: ${JSON.stringify(viewType)}</li>
    </ul>`;
  },
  'default-main': ({ html, hook, shopify, locales, settings }) => (element) => {
    const [products, viewType] = hook(element);
    return html`
      ${products.length > 0
        ? html`
            ${products.map((product) => {
              return viewType === 'grid'
                ? html`<main-collection-product-grid-item class="grid__item wide--one-fifth large--one-quarter medium-down--one-half" .product=${product}></main-collection-product-item>`
                : html`<main-collection-product-list-item
                    .product=${product}
                  ></main-collection-product-list-item>`;
            })}
          `
        : html`${shopify.shopProductsCount === 0
            ? html`
                <div class="grid__item">
                  <div class="helper-section">
                    <div
                      class="grid-uniform helper-content${settings[
                        'main-collection'
                      ].center_grid_link
                        ? ' text-center'
                        : ''}"
                    >
                      ${range(1, 8).map((num) => {
                        return html` <div
                          class="grid__item one-half post-large--one-quarter"
                        >
                          <a href="/admin/products" class="grid-link">
                            <span
                              class="grid-link__image grid-link__image--product"
                            >
                              <span class="grid-link__image-centered">
                                ${html`${unsafeHTML(
                                  shopify.placeHolders[
                                    `product-${num % 6 ? num % 6 : 6}`
                                  ]
                                )}`}
                              </span>
                            </span>
                            <p class="grid-link__title">
                              ${locales[locales.currentLanguage].home_page
                                .onboarding.product_title}
                            </p>
                            <p class="grid-link__meta">
                              <strong>$19.99</strong>
                            </p>
                          </a>
                        </div>`;
                      })}
                    </div>
                  </div>
                </div>
              `
            : html`
                <div class="grid__item">
                  <p>
                    <em
                      >${locales[locales.currentLanguage].collections.general
                        .no_matches}</em
                    >
                  </p>
                </div>
              `}`}
    `;
  },
};
