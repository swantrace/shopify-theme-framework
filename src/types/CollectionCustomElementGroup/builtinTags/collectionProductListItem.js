export default {
  demo: ({ html, hook }) => (element) => {
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
  'default-main': ({ html, hook }) => (element) => {
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
