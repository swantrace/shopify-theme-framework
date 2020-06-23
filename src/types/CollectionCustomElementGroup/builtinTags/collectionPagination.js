export default {
  demo: ({ html, hook }) => (element) => {
    const [
      currentPage,
      productsCount,
      itemsPerPage,
      totalPageNumber,
      pageRange,
      { gotoNextPage, gotoPreviousPage, gotoThisPage },
    ] = hook(element);
    return html`<ul>
      <li>currentPage: ${currentPage}</li>
      <li>productsCount: ${productsCount}</li>
      <li>itemsPerPage: ${itemsPerPage}</li>
      <li>totalPageNumber: ${totalPageNumber}</li>
      <li>pageRange: ${pageRange}</li>
      <li>{ gotoNextPage }: ${gotoNextPage}</li>
      <li>{ gotoPreviousPage }: ${gotoPreviousPage}</li>
      <li>{ gotoThisPage }: ${gotoThisPage}</li>
    </ul>`;
  },
};
