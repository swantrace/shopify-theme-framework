/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html } = helpers;
    return html`<ul class="header-bar__module header-bar__module--list">
      {% if customer %}
      <li>
        <a href="{{ routes.account_url }}"
          >{{ 'layout.customer.account' | t }}</a
        >
      </li>
      <li>
        {{ 'layout.customer.log_out' | t | customer_logout_link }}
      </li>
      {% else %}
      <li>
        {{ 'layout.customer.log_in' | t | customer_login_link }}
      </li>
      <li>{{ 'layout.customer.or' | t }}</li>
      <li>
        {{ 'layout.customer.create_account' | t | customer_register_link }}
      </li>
      {% endif %}
    </ul>`;
  },
};
