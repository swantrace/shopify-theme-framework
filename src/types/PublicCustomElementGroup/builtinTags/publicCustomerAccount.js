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
      ${shopify.customerLoggedIn
        ? html`<li>
              <a href="${shopify.routes.accountURL}"
                >${locales[locales.currentLanguage].layout.customer.account}</a
              >
            </li>
            <li>
              <a href="/account/logout" id="customer_logout_link"
                >${locales[locales.currentLanguage].layout.customer.log_out}</a
              >
            </li>`
        : html` <li>
              <a href="/account/login" id="customer_login_link"
                >${locales[locales.currentLanguage].layout.customer.log_in}</a
              >
            </li>
            <li>${locales[locales.currentLanguage].layout.customer.or}</li>
            <li>
              <a
                href="/account/create_account"
                id="customer_create_account_link"
                >${locales[locales.currentLanguage].layout.customer
                  .create_account}</a
              >
            </li>`}
    </ul>`;
  },
};
