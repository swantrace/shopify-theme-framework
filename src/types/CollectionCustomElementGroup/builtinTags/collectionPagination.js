/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html, unsafeHTML } = helpers;
    const [paginate, { gotoNextPage, gotoPreviousPage, gotoThisPage }] = hook(
      element
    );
    return html`<ul>
      <li>paginate: ${JSON.stringify(paginate)}</li>
      <li>{ gotoNextPage }: ${gotoNextPage}</li>
      <li>{ gotoPreviousPage }: ${gotoPreviousPage}</li>
      <li>{ gotoThisPage }: ${gotoThisPage}</li>
    </ul>`;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html, unsafeHTML } = helpers;
    const [paginate, { gotoNextPage, gotoPreviousPage, gotoThisPage }] = hook(
      element
    );

    const previousURL =
      paginate &&
      paginate.previous &&
      paginate.previous.url &&
      paginate.previous.is_link
        ? `${paginate.previous.url.replace('&view=theme', '')}`
        : ``;
    const previousTitle =
      paginate && paginate.previous && paginate.previous.title;
    const nextURL =
      paginate && paginate.next && paginate.next.url && paginate.next.is_link
        ? `${paginate.next.url.replace('&view=theme', '')}`
        : ``;
    const nextTitle = paginate && paginate.next && paginate.next.title;

    return html`${paginate && paginate.pages && paginate.pages > 1
      ? html`<hr class="hr--clear" />
          <div class="text-center">
            <ul class="pagination-custom">
              <li class=${paginate.current_page === 1 ? 'disabled' : ''}>
                <a
                  href="${previousURL}"
                  title="${previousTitle}"
                  @click=${gotoPreviousPage}
                  >&larr;</a
                >
              </li>
              ${paginate.parts.map((i) => {
                return html`
                  <li
                    class=${i.title === paginate.current_page ? 'active' : ''}
                  >
                    <a
                      href="${i.is_link ? `${i.url}` : ``}"
                      @click=${gotoThisPage}
                      data-value=${i.title}
                      >${unsafeHTML(i.title)}</a
                    >
                  </li>
                `;
              })}
              <li
                class=${paginate.current_page === paginate.pages
                  ? 'disabled'
                  : ''}
              >
                <a href="${nextURL}" title="${nextTitle}" @click=${gotoNextPage}
                  >&rarr;</a
                >
              </li>
            </ul>
          </div>`
      : html``} `;
  },
};
