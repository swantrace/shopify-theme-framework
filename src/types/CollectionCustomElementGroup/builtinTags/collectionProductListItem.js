/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    const [
      product,
      currentVariant,
      options,
      { onATCButtonClicked, onOptionChanged },
    ] = hook(element);
    return html`<ul>
      <li>product: ${JSON.stringify(product)}</li>
      <li>currentVariant: ${JSON.stringify(currentVariant)}</li>
      <li>options : ${JSON.stringify(options)}</li>
      <li>{ onATCButtonClicked }: ${onATCButtonClicked}</li>
      <li>{ onOptionChanged }: ${onOptionChanged}</li>
    </ul>`;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html } = helpers;
    const [
      product,
      currentVariant,
      options,
      { onATCButtonClicked, onOptionChanged },
    ] = hook(element);
    return html`<ul>
      <li>product: ${JSON.stringify(product)}</li>
      <li>currentVariant: ${JSON.stringify(currentVariant)}</li>
      <li>options : ${JSON.stringify(options)}</li>
      <li>{ onATCButtonClicked }: ${onATCButtonClicked}</li>
      <li>{ onOptionChanged }: ${onOptionChanged}</li>
    </ul>`;
  },
};
