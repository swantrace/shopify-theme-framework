export default {
  demo: ({ html, hook }) => (element) => {
    const [products, viewType] = hook(element);
    return html`<ul>
      <li>products: ${JSON.stringify(products)}</li>
      <li>view_type: ${JSON.stringify(viewType)}</li>
    </ul>`;
  },
};
