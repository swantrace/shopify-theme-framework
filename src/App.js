import ajaxAPIsCreator from './ajax';
import Store from './Store';
import helpers from './helpers';
import 'lazysizes';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';

import {
  CartCustomElementGroup,
  CollectionCustomElementGroup,
  ProductCustomElementGroup,
  SearchCustomElementGroup,
  PublicCustomElementGroup,
  PasswordCustomElementGroup,
  PageCustomElementGroup,
  ListCollectionElementGroup,
  IndexCustomElement,
  CustomerCustomElement,
  BlogCustomElementGroup,
  ArticleCustomElementGroup,
  FourZeroFourCustomElementGroup,
} from './types';

export default class App {
  constructor({
    customElementGroupTypeClasses = [],
    customElementGroupDefinitions = [],
    config = {},
    shopify = {},
    transformFns = {},
    settings = {},
    locales = {},
  } = {}) {
    if (!App.instance) {
      this.customElementGroupTypeClasses = customElementGroupTypeClasses;
      this.customElementGroupDefinitions = customElementGroupDefinitions;
      this.config = config;
      this.shopify = shopify;
      this.settings = settings;
      this.locales = locales;
      this.transformFns = {
        cart: transformFns && transformFns.cart ? transformFns.cart : [],
        collection:
          transformFns && transformFns.collection
            ? [
                ...transformFns.collection,
                (collection) => ({
                  ...collection,
                  all_tags: this.helpers.handliezeTags(collection.all_tags),
                  tags: this.helpers.handliezeTags(collection.tags),
                  current_tags: this.helpers.concatTags(
                    collection.current_tags
                  ),
                }),
              ]
            : [
                (collection) => ({
                  ...collection,
                  all_tags: this.helpers.handliezeTags(collection.all_tags),
                  tags: this.helpers.handliezeTags(collection.tags),
                  current_tags: this.helpers.concatTags(
                    collection.current_tags
                  ),
                }),
              ],
        product:
          transformFns && transformFns.product ? transformFns.product : [],
        blog:
          transformFns && transformFns.blog
            ? [
                ...transformFns.blog,
                (blog) => ({
                  ...blog,
                  all_tags: this.helpers.handliezeTags(blog.all_tags),
                  tags: this.helpers.handliezeTags(blog.tags),
                  current_tags: this.helpers.concatTags(blog.current_tags),
                }),
              ]
            : [
                (blog) => ({
                  ...blog,
                  all_tags: this.helpers.handliezeTags(blog.all_tags),
                  tags: this.helpers.handliezeTags(blog.tags),
                  current_tags: this.helpers.concatTags(blog.current_tags),
                }),
              ],
      };
      this.customElementGroupTypeList = {};
      this.customElementGroups = {};
      this.helpers = helpers;
      this.components = {};

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

  register(type, id, tagDefinitions, apis, transformFns, shopify, helperFns) {
    return this.getType(type)(
      id,
      tagDefinitions,
      apis,
      transformFns,
      shopify,
      helperFns
    );
  }

  static async init(...args) {
    const app = new App(...args);
    app.apis = await ajaxAPIsCreator(app.config, app.shopify);
    app.customElementGroupTypeClasses = Object.assign(
      {
        cart: CartCustomElementGroup,
        collection: CollectionCustomElementGroup,
        product: ProductCustomElementGroup,
        fourZeroFour: FourZeroFourCustomElementGroup,
        search: SearchCustomElementGroup,
        public: PublicCustomElementGroup,
        password: PasswordCustomElementGroup,
        page: PageCustomElementGroup,
        listCollection: ListCollectionElementGroup,
        index: IndexCustomElement,
        customer: CustomerCustomElement,
        blog: BlogCustomElementGroup,
        article: ArticleCustomElementGroup,
      },
      ...app.customElementGroupTypeClasses
    );

    app.addTypes(app.customElementGroupTypeClasses);

    app.customElementGroupDefinitions.forEach(
      ({ type, id, tagDefinitions }) => {
        const group = app.register(
          type,
          id,
          tagDefinitions,
          app.apis,
          app.transformFns,
          app.shopify,
          app.helpers
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
          helpers,
          hook: hook(app.store),
          settings: app.settings,
          locales: app.locales,
          shopify: app.shopify,
        });

        const currentComponent = app.helpers.component(Component, {
          observedAttributes,
          useShadowDOM: false,
        });

        customElements.define(tagname, currentComponent);
        app.components[tagname] = currentComponent;
      });
    });

    window.app = app;
    document.documentElement.className = document.documentElement.className.replace(
      'no-js',
      'supports-js'
    );
    return app;
  }
}
