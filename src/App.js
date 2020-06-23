import { html, component } from 'haunted';
import ajaxAPIsCreator from './ajax';
import Store from './Store';
import helpers from './helpers';

import {
  CartCustomElementGroup,
  CollectionCustomElementGroup,
  ProductCustomElementGroup,
} from './types';

export default class App {
  constructor({
    customElementGroupTypeClassArray = [],
    customElementGroupDefinitions = [],
    config = {},
    shopify = {},
    transformFns = {},
    settings = {},
    locales = {},
  } = {}) {
    if (!App.instance) {
      this.customElementGroupTypeClassArray = customElementGroupTypeClassArray;
      this.customElementGroupDefinitions = customElementGroupDefinitions;
      this.config = config;
      this.shopify = shopify;
      this.helpers = helpers;
      this.settings = settings;
      this.locales = locales;
      this.customElementGroupTypeList = {};
      this.customElementGroups = {};
      this.transformFns = {
        cart: transformFns && transformFns.cart ? transformFns.cart : [],
        collection:
          transformFns && transformFns.collection
            ? [
                ...transformFns.collection,
                (collection) => {
                  return {
                    ...collection,
                    all_tags: collection.all_tags.map((tag) => {
                      return {
                        label: tag,
                        handle: this.helpers.handleize(tag),
                      };
                    }),
                  };
                },
              ]
            : [
                (collection) => {
                  return {
                    ...collection,
                    all_tags: collection.all_tags.map((tag) => {
                      return {
                        label: tag,
                        handle: this.helpers.handleize(tag),
                      };
                    }),
                  };
                },
              ],
        product:
          transformFns && transformFns.product ? transformFns.product : [],
      };

      App.instance = this;
    }
    return App.instance;
  }

  addType({ type, ClassName }) {
    this.customElementGroupTypeList[type] = (...args) => {
      return new ClassName(...args);
    };
  }

  addTypes(typeClassPairs) {
    Object.keys(typeClassPairs).forEach((type) => {
      this.addType({ type, ClassName: typeClassPairs[type] });
    });
  }

  getType(type) {
    return this.customElementGroupTypeList[type];
  }

  register(type, id, tagDefinitions, apis, transformFns, shopify) {
    return this.getType(type)(id, tagDefinitions, apis, transformFns, shopify);
  }

  static async init(...args) {
    const app = new App(...args);
    app.apis = await ajaxAPIsCreator(app.config, app.shopify);

    app.addTypes(
      Object.assign(
        {
          cart: CartCustomElementGroup,
          collection: CollectionCustomElementGroup,
          product: ProductCustomElementGroup,
        },
        ...app.customElementGroupTypeClassArray
      )
    );

    app.customElementGroupDefinitions.forEach(
      ({ type, id, tagDefinitions }) => {
        const group = app.register(
          type,
          id,
          tagDefinitions,
          app.apis,
          app.transformFns,
          app.shopify
        );
        app.customElementGroups = {
          ...app.customElementGroups,
          [`${id}-${type}`]: group,
        };
      }
    );

    const globalActions = {};
    const globalMutations = {
      setCartIsUpdating: (state, payload) => {
        state.cart_is_updating = payload;
      },
      setCollectionIsUpdating: (state, payload) => {
        state.collection_is_updating = payload;
      },
    };
    const globalInitialState = {
      collection_is_updating: false,
      cart_is_updating: false,
    };
    const globalCallbacks = [];
    Object.keys(app.customElementGroups).forEach((idAndType) => {
      const {
        key,
        actions,
        mutations,
        initialState,
        callback,
      } = app.customElementGroups[idAndType];
      Object.assign(globalActions, actions);
      Object.assign(globalMutations, mutations);
      Object.assign(globalInitialState, { [key]: initialState });
      globalCallbacks.push({ key, callback });
    });

    app.store = new Store({
      actions: globalActions,
      mutations: globalMutations,
      initialState: globalInitialState,
    });

    globalCallbacks.forEach(({ key, callback }) => {
      app.store.subscribe(key, callback);
    });

    Object.keys(app.customElementGroups).forEach((idandType) => {
      const { tags } = app.customElementGroups[idandType];
      tags.forEach(({ definition, hook, observedAttributes, tagname }) => {
        const Component = definition({
          html,
          hook: hook(app.store, app.apis, app.helpers),
          store: app.store,
          apis: app.apis,
          settings: app.settings,
          locales: app.locales,
        });

        customElements.define(
          tagname,
          component(Component, {
            observedAttributes,
            useShadowDOM: false,
          })
        );
      });
    });

    window.app = app;

    return app;
  }
}
