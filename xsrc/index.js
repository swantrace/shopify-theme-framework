import globalStoreCreator from "./globalStore";
import { component, html, useState, useEffect } from "haunted";

const haunted = { html, useEffect, useState };
const init = async function () {
  const { store, apis } = await globalStoreCreator();
  window[window.themeName].themeElements.forEach(
    ({ tagName, observedAttributes, definition }) => {
      const Component = definition(haunted, store, apis);
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
