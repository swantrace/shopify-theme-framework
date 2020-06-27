export default {
  demo: ({ html, hook }) => (element) => {
    const [
      currentPage,
      totalPageNumber,
      pageRange,
      { gotoNextPage, gotoPreviousPage, gotoThisPage },
    ] = hook(element);
    return html`<ul>
      <li>currentPage: ${currentPage}</li>
      <li>totalPageNumber: ${totalPageNumber}</li>
      <li>pageRange: ${pageRange}</li>
      <li>{ gotoNextPage }: ${gotoNextPage}</li>
      <li>{ gotoPreviousPage }: ${gotoPreviousPage}</li>
      <li>{ gotoThisPage }: ${gotoThisPage}</li>
    </ul>`;
  },
  'default-main': ({ html, hook }) => (element) => {
    const [
      currentPage,
      totalPageNumber,
      pageRange,
      { gotoNextPage, gotoPreviousPage, gotoThisPage },
    ] = hook(element);

    return html`${totalPageNumber > 1
      ? html`<hr class="hr--clear" />
          <div class="text-center">
            <ul class="pagination-custom">
              <li class=${currentPage === 1 ? 'disabled' : ''}>
                <a href="" @click=${gotoPreviousPage}>&larr;</a>
              </li>
              ${pageRange.map((i) => {
                return html`
                  <li class=${i === currentPage ? 'active' : ''}>
                    <a href="" @click=${gotoThisPage} data-value=${i}>${i}</a>
                  </li>
                `;
              })}
              <li class=${currentPage === totalPageNumber ? 'disabled' : ''}>
                <a href="" @click=${gotoNextPage}>&rarr;</a>
              </li>
            </ul>
          </div>`
      : html``} `;
  },
};
