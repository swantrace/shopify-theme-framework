export default {
  demo: ({ html, hook }) => (element) => {
    const [currentTags, allTags, tags, { onCurrentTagsChanged }] = hook(
      element
    );
    return html`<ul>
      <li>currentTags: ${JSON.stringify(currentTags)}</li>
      <li>allTags: ${JSON.stringify(allTags)}</li>
      <li>tags: ${JSON.stringify(tags)}</li>
      <li>{ onCurrentTagsChanged }: ${onCurrentTagsChanged}</li>
    </ul>`;
  },
  'default-main': ({ html, hook, locales }) => (element) => {
    const [currentTags, allTags, , { onCurrentTagsChanged }] = hook(element);
    return html`${allTags.length > 0
      ? html`
          <label for="BrowseBy"
            >${locales[locales.currentLanguage].collections.sorting
              .browse}</label
          >
          <select
            name="BrowseBy"
            id="BrowseBy"
            class="btn--tertiary"
            @change=${onCurrentTagsChanged}
          >
            <option value=""
              >${locales[locales.currentLanguage].collections.sorting
                .all_tags}</option
            >
            ${allTags.map(({ label, handle }) => {
              return html`<option
                value=${handle}
                ?selected=${currentTags[0] === handle}
                >${label}</option
              >`;
            })}
          </select>
        `
      : html``}`;
  },
};
