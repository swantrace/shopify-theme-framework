/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html, unsafeHTML, range, formatMoney } = helpers;
    const [product] = hook(element);
    return html`<ul>
      <li>product: ${JSON.stringify(product)}</li>
    </ul>`;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, unsafeHTML, range, formatMoney } = helpers;
    const [product, viewType, collectionHandle, productIndex] = hook(element);
    const soldOut = !product.available;
    const onSale = product.compare_at_price > product.price;
    const priceVaries = product.price_varies;
    const urlWithinCollection = `/collections/${collectionHandle}/products/${product.handle}`;
    const sectionSettings = settings['main-collection'];
    const currentLocales = locales[locales.currentLanguage];
    const centerGridLink = sectionSettings.center_grid_link;
    const showSoldOutCircle = sectionSettings.show_sold_out_circle;
    const showSaleCircle = sectionSettings.show_sale_circle;
    const vendorEnable = sectionSettings.vendor_enable;
    const saleText = currentLocales.products.product.sale;
    const saleTextIsLong = saleText.length > 7;
    const soldOutText = currentLocales.products.product.sold_out;
    const soldOutTextIsLong = saleText.length > 9;
    const regularPriceText = currentLocales.products.product.regular_price;
    const salePriceText = currentLocales.products.product.sale_price;
    const unitPriceLabelText = currentLocales.products.product.unit_price_label;
    const unitPriceSeparatorText =
      currentLocales.general.accessibility.unit_price_separator;

    const formattedPrice = formatMoney(product.price, shopify.moneyFormat);
    const formattedCompareAtPrice = formatMoney(
      product.compare_at_price,
      shopify.moneyFormat
    );

    const fromHTMLText = currentLocales.products.general.from_html.replace(
      '{{ price }}',
      formattedPrice
    );

    const variant = product.variants.find(
      (v) => v.id === product.selected_or_first_available_variant_id
    );

    const formattedVariantUnitPrice = formatMoney(
      variant.unit_price,
      shopify.moneyFormat
    );

    const placeHolderImage = unsafeHTML(
      shopify.placeHolders[
        `product-${(productIndex + 1) % 6 ? (productIndex + 1) % 6 : 6}`
      ].replace('svg', 'svg class="placeholder-svg"')
    );

    const img = product.featured_image;
    const imgID = `ProductImage-${img.id}`;
    const wrapperID = `ProductImageWrapper-${img.id}`;
    const imgURL = `${img.src.replace('_1x1', '_{width}x')}`;
    const height = 480;
    const width = 335;
    let maxWidth;
    let maxHeight;
    if (img.aspect_ratio < 1) {
      maxWidth = height * img.aspect_ratio;
      if (img.height < height) {
        maxHeight = img.height;
        maxWidth = img.width;
      } else {
        maxHeight = height;
      }
    } else {
      maxHeight = width / img.aspect_ratio;
      if (img.width < width) {
        maxHeight = img.height;
        maxWidth = img.width;
      } else {
        maxWidth = width;
      }
    }
    const imgStyle = `<style>
      #${imgID}{max-width: ${maxWidth}px; max-height: ${maxHeight}px;}
      #${wrapperID}{max-width: ${maxWidth}px;}
    </style>`;

    const saleCircle = `${
      onSale && showSaleCircle
        ? `
            <span class="badge badge--sale">
              <span
                class="badge__text${
                  saleTextIsLong ? ' badge__text--small' : ''
                }"
              >
                ${saleText}
              </span>
            </span>
          `
        : ``
    }`;

    const soldOutCircle = `${
      soldOut && showSoldOutCircle
        ? `
          <span class="badge badge--sold-out">
            <span
              class="badge__text${
                soldOutTextIsLong ? 'badge__text--small' : ''
              }"
            >
              ${soldOutText}
            </span>
          </span>
        `
        : ``
    }`;

    const featuredImage = `<span class="grid-link__image-centered">
    ${
      product.title
        ? `${
            img.existed
              ? `${imgStyle}
                <div
                  id="${wrapperID}"
                  class="product__img-wrapper supports-js"
                >
                  <div
                    style="padding-top: ${(1 / img.aspect_ratio) * 100}%"
                  >
                    <img
                      id="${imgID}"
                      alt="${img.alt}"
                      class="product__img lazyload"
                      data-src="${imgURL}"
                      data-widths="[150, 220, 360, 470, 600, 750, 940, 1080, 1296, 1512, 1728, 2048]"
                      data-aspectratio="${img.aspect_ratio}"
                      data-sizes="auto"
                      data-image
                    />
                  </div>
                </div>`
              : `
                <img
                  src="${img.src}"
                  alt="${img.alt}"
                  class="product__img"
                  data-image
                />
              `
          }
          <noscript>
            <img
              src="${img.src}"
              alt="${img.alt}"
              class="product__img"
            />
          </noscript>`
        : `${placeHolderImage}`
    }
  </span>`;

    const productTitle = `<p class="grid-link__title">${product.title}</p>`;

    const productVendor = `${
      vendorEnable
        ? ` <p class="grid-link__title grid-link__vendor">${product.vendor}</p>`
        : ``
    }`;

    const productPrice = `${
      product.title
        ? `
      <p class="grid-link__meta">
        ${
          onSale
            ? `<span class="visually-hidden">${regularPriceText}</span><s class="grid-link__sale_price">${formattedCompareAtPrice}</s>`
            : ``
        }
        ${
          priceVaries
            ? `${fromHTMLText}`
            : `${
                onSale
                  ? `
          <span class="visually-hidden">${salePriceText}</span>
        `
                  : `<span class="visually-hidden">${regularPriceText}</span>`
              }`
        }
        ${formattedPrice}
        ${
          variant.availabe && variant.unit_price_measurement
            ? `
          <span class="product-unit-price ${
            !variant.unit_price_measurement ? `hide` : ``
          } grid-link__unit-price" data-unit-price-container>
            <span class="visually-hidden">${unitPriceLabelText}</span>
            <span data-unit-price>${formattedVariantUnitPrice}</span>
            <span aria-hidden="true">/</span>
            <span class="visually-hidden">${unitPriceSeparatorText}</span>
            <span data-unit-price-base-unit>
              ${
                variant.unit_price_measurement
                  ? `${
                      variant.unit_price_measurement.reference_value !== 1
                        ? `${variant.unit_price_measurement.reference_value}`
                        : ``
                    }
              ${variant.unit_price_measurement.reference_unit}`
                  : ``
              }
            </span>
          </span>
        `
            : ``
        }
      </p>
    `
        : ``
    }`;

    return html`
      <div class="${soldOut ? 'soldOut ' : ''}${onSale ? 'on-sale' : ''}">
        <a
          href="${urlWithinCollection}"
          class="grid-link ${centerGridLink ? 'text-center' : ''}"
        >
          <span
            class="grid-link__image grid-link__image--loading ${showSoldOutCircle
              ? 'grid-link__image-sold-out'
              : ''} grid-link__image-product"
            data-image-wrapper
          >
            ${unsafeHTML(saleCircle)} ${unsafeHTML(soldOutCircle)}
            ${unsafeHTML(featuredImage)}
          </span>
          ${unsafeHTML(productTitle)} ${unsafeHTML(productVendor)}
          ${unsafeHTML(productPrice)}
        </a>
      </div>
    `;
  },
};
