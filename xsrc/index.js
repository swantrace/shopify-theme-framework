import globalStoreCreator from "./globalStore";
import { html, component } from "haunted";
import hooksCreator from "./hooks";

const init = async function () {
  const { store, apis } = await globalStoreCreator();
  const hooks = await hooksCreator(store, apis);
  window[window.themeName].themeElements.forEach(
    ({ tagName, observedAttributes, definition }) => {
      const Component = definition(html, hooks, store, apis);
      Component.observedAttributes = observedAttributes;
      customElements.define(
        tagName,
        component(Component, {
          useShadowDOM: false,
        })
      );
    }
  );
  store.dispatch("initiate");
};

window.addEventListener("DOMContentLoaded", (event) => {
  init();
});
