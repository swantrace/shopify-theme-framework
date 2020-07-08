/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    const [sortBy, sortOptions, { onSortByChanged }] = hook(element);
    return html`<ul>
      <li>sortBy: ${sortBy}</li>
      <li>sort_options: ${JSON.stringify(sortOptions)}</li>
      <li>onSortByChanged: ${onSortByChanged}</li>
    </ul>`;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html } = helpers;
    const [sortBy, sortOptions, { onSortByChanged }] = hook(element);
    return html`
      <label for="SortBy"
        >${locales[locales.currentLanguage].collections.sorting.title}</label
      >
      <select
        name="sort_by"
        id="SortBy"
        @change=${onSortByChanged}
        class="btn--tertiary"
        aria-describedby="a11y-refresh-page-message"
      >
        ${sortOptions &&
        sortOptions.length &&
        sortOptions.map((option) => {
          return html`<option
            value=${option.value}
            ?selected=${sortBy === option.value}
            >${option.name}</option
          >`;
        })}
      </select>
    `;
  },
};
