import ajaxAPIsCreator from "./ajax";
import { encodedStr } from "./helpers";
import Store from "./Store";

const dispatchAjaxFailEvent = (source, error) => {
  const event = new CustomEvent("ajaxRequestFail", {
    detail: { data: error.response.data, source },
  });
  document.dispatchEvent(event);
};

const cartTransformFn =
  window.themeName &&
  window[window.themeName] &&
  window[window.themeName].cartTransformFn &&
  typeof window[window.themeName].cartTransformFn === "function"
    ? window[window.themeName].cartTransformFn
    : function (cart) {
        return new Promise(function (resolve, reject) {
          resolve(cart);
        });
      };

export default async () => {
  const apis = await ajaxAPIsCreator();
  const template = window[window.themeName].template;
  const canonical_url = window[window.themeName].canonical_url;

  // const initialCart = await apis.getCart();
  // const initialProducts = [];
  // const initialState = {
  //   cart: initialCart,
  //   collection:
  //     window[window.themeName].current_page_info.template === "collection"
  //       ? window[window.themeName].current_page_info
  //       : null,
  //   cart_is_updating: false,
  //   collection_is_updating: false,
  // };
  let initialState = {
    cart: null,
    cart_is_updating: false,
  };

  switch (template) {
    case "collection":
      initialState = Object.assign(initialState, {
        collection: null,
        collection_is_updating: false,
      });
      break;

    default:
      break;
  }

  const actions = {
    addItems(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .addItem({ data: { items: payload } })
        .then(function (items) {
          return apis.getCart();
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("addItems", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    addItemFromForm(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .addItem({ data: new FormData(payload) })
        .then(function (items) {
          return apis.getCart();
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("addItemFromForm", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    addItem(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .addItem({
          data: {
            id: payload.id,
            quantity: payload.quantity,
            properties: payload.properties,
          },
        })
        .then(function (items) {
          return apis.getCart();
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("addItem", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    changeItemByLine(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .changeItem({
          data: { line: payload.line, quantity: payload.quantity },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("changeItemByLine", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    changeItemByKey(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .changeItem({
          data: { id: payload.key, quantity: payload.quantity },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
          if (cart.items.find((item) => item.key == payload.key)) {
            const modifiedItem = cart.items.find(
              (item) => item.key == payload.key
            );
            if (modifiedItem.quantity != payload.quantity) {
              throw {
                response: {
                  data: {
                    description: `All ${modifiedItem.quantity} ${modifiedItem.title} are in your cart.`,
                    message: "Cart Error",
                    status: 200,
                  },
                },
              };
            }
          }
        })
        .catch((error) => {
          dispatchAjaxFailEvent("changeItemByKey", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    removeItemByLine(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .changeItem({
          data: { line: payload, quantity: 0 },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("removeItemByLine", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    removeItemByKey(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .changeItem({
          data: { id: payload, quantity: 0 },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("removeItemByKey", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    updateCartFromForm(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .updateCart({
          data: new FormData(payload),
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("updateCartFromForm", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    updateCartAttributes(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .updateCart({
          data: { attributes: payload },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("updateCartAttributes", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    updateCartNote(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .updateCart({
          data: { note: payload },
        })
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("updateCartNote", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    clearCart(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .clearCart()
        .then((cart) => {
          return cartTransformFn(cart);
        })
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        })
        .catch((error) => {
          dispatchAjaxFailEvent("clearCart", error);
          context.commit("setCartIsUpdating", false);
        });
    },
    changeCollectionTags(context, payload) {
      if (context.state.collection) {
        context.commit("setCollectionTags", payload);
        context.commit("setCollectionIsUpdating", true);
        let tags, params;
        if (
          context.state.collection.handle === "types" ||
          context.state.collection.handle === "vendors"
        ) {
          params = {
            q: context.state.collection.title,
            constraint: payload,
            page: context.state.collection.page,
            sort_by: context.state.collection.sort_by,
          };
        } else {
          tags = payload;
          params = {
            page: context.state.collection.page,
            sort_by: context.state.collection.sort_by,
          };
        }
        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: "theme",
            params,
            tags,
          })
          .then(({ products }) => {
            context.commit("setCollectionProducts", products);
            context.commit("setCollectionIsUpdating", false);
          });
      }
    },
    changeCollectionPage(context, payload) {
      if (context.state.collection) {
        context.commit("setCollectionPage", payload);
        context.commit("setCollectionIsUpdating", true);
        let tags, params;
        if (
          context.state.collection.handle === "types" ||
          context.state.collection.handle === "vendors"
        ) {
          params = {
            q: context.state.collection.title,
            constraint: context.state.collection.tags,
            page: payload,
            sort_by: context.state.collection.sort_by,
          };
        } else {
          tags = context.state.collection.tags;
          params = {
            page: payload,
            sort_by: context.state.collection.sort_by,
          };
        }
        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: "theme",
            params,
            tags,
          })
          .then(({ products }) => {
            context.commit("setCollectionProducts", products);
            context.commit("setCollectionIsUpdating", false);
          });
      }
    },
    changeCollectionSortBy(context, payload) {
      if (context.state.collection) {
        context.commit("setCollectionSortBy", payload);
        context.commit("setCollectionIsUpdating", true);
        let tags, params;
        if (
          context.state.collection.handle === "types" ||
          context.state.collection.handle === "vendors"
        ) {
          params = {
            q: context.state.collection.title,
            constraint: context.state.collection.tags,
            page: context.state.collection.page,
            sort_by: payload,
          };
        } else {
          tags = context.state.collection.tags;
          params = {
            page: context.state.collection.page,
            sort_by: payload,
          };
        }
        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: "theme",
            params,
            tags,
          })
          .then(({ products }) => {
            context.commit("setCollectionProducts", products);
            context.commit("setCollectionIsUpdating", false);
          });
      }
    },
    changeCollectionViewType(context, payload) {
      if (context.state.collection) {
        context.commit("setCollectionViewType", payload);
      }
    },
    initiate(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis.getCart().then((cart) => {
        context.commit("setCart", cart);
        context.commit("setCartIsUpdating", false);
      });
      if (context.state.collection) {
        context.commit("setCartIsUpdating", true);
        context.commit("setCollectionIsUpdating", true);
        let tags, params;
        if (
          context.state.collection.handle === "types" ||
          context.state.collection.handle === "vendors"
        ) {
          params = {
            q: context.state.collection.title,
            constraint: context.state.collection.tags,
            page: context.state.collection.page,
            sort_by: context.state.collection.sort_by,
          };
        } else {
          tags = context.state.collection.tags;
          params = {
            page: context.state.collection.page,
            sort_by: context.state.collection.sort_by,
          };
        }
        apis
          .getCollection({
            handle: context.state.collection.handle,
            view: "theme",
            params,
            tags,
          })
          .then((products) => {
            context.commit("setCollectionProducts", products);
            context.commit("setCollectionIsUpdating", false);
          });
      }
    },
  };

  const mutations = {
    setError(state, payload) {
      state.error = payload;
      return state;
    },
    setCart(state, payload) {
      state.cart = payload;
      return state;
    },
    setCartIsUpdating(state, payload) {
      state.cart_is_updating = payload;
      return state;
    },
    setCollectionTags(state, payload) {
      state.collection = { ...state.collection, tags: payload };
      return state;
    },
    setCollectionPage(state, payload) {
      state.collection = { ...state.collection, page: payload };
      return state;
    },
    setCollectionSortBy(state, payload) {
      state.collection = { ...state.collection, sort_by: payload };
      return state;
    },
    setCollectionProducts(state, payload) {
      state.collection = { ...state.collection, products: payload };
      return state;
    },
    setCollectionViewType(state, payload) {
      state.collection = { ...state.collection, view_type: payload };
      return state;
    },
    setCollectionIsUpdating(state, payload) {
      state.collection_is_updating = payload;
      return state;
    },
  };

  const store = new Store({
    actions,
    mutations,
    initialState,
  });

  store.subscribe(function (keysArr, newValue, oldValue) {
    switch (keysArr[0]) {
      case "cart_is_updating":
        if (typeof window[themeName].onCartIsUpdatingChanged === "function") {
          window[themeName].onCartIsUpdatingChanged(newValue);
        } else {
          if (newValue === true) {
            document
              .querySelectorAll(
                `[${window["themeName"]}-atc-form], [${window["themeName"]}-cart-form]`
              )
              .forEach((el) => el.setAttribute("cart_is_updating", ""));
          } else {
            document
              .querySelectorAll(
                `[${window["themeName"]}-atc-form], [${window["themeName"]}-cart-form]`
              )
              .forEach((el) => el.removeAttribute("cart_is_updating"));
          }
        }
        break;
      case "cart":
        if (typeof window[themeName].onCartChanged === "function") {
          window[themeName].onCartChanged(newValue, oldValue);
        } else {
          document
            .querySelectorAll(`[${window["themeName"]}-cart-form]`)
            .forEach((el) => {
              el.setAttribute(
                "old_cart_json",
                encodedStr(JSON.stringify(oldValue))
              );
              el.setAttribute(
                "cart_json",
                encodedStr(JSON.stringify(newValue))
              );
            });
        }
        break;
      case "collection":
        switch (keysArr[1]) {
          case "tags":
            if (typeof window[themeName].onTagsChanged === "function") {
              window[themeName].onTagsChanged(newValue.tags);
            } else {
              if (typeof newValue.tags === "string") {
                document
                  .querySelectorAll(
                    `[${window["themeName"]}-collection-tags-filter]`
                  )
                  .forEach((el) => {
                    el.setAttribute("tags", newValue.tags);
                  });
              } else {
                throw new Error("tags' value has to be a string");
              }
            }
            break;
          case "page":
            if (typeof window[themeName].onPageChanged === "function") {
              window[themeName].onPageChanged(
                newValue.page,
                newValue.products_count,
                items_per_page
              );
            } else {
              if (typeof newValue.page === "number") {
                document
                  .querySelectorAll(
                    `[${window["themeName"]}-collection-page-controller]`
                  )
                  .forEach((el) => {
                    el.setAttribute("current_page", newValue.page);
                    el.setAttribute("products_count", newValue.products_count);
                    el.setAttribute("items_per_page", newValue.items_per_page);
                  });
              } else {
                throw new Error("page' value has to be a number");
              }
            }
            break;
          case "sort_by":
            if (typeof window[themeName].onSortByChanged === "function") {
              window[themeName].onSortByChanged(newValue.sort_by);
            } else {
              if (
                [
                  "manual",
                  "best-selling",
                  "title-ascending",
                  "title-descending",
                  "price-ascending",
                  "price-descending",
                  "created-ascending",
                  "created-descending",
                ].includes(newValue.sort_by)
              ) {
                document
                  .querySelectorAll(
                    `[${window["themeName"]}-collection-sort-by-controller]`
                  )
                  .forEach((el) => {
                    el.setAttribute("sort_by", newValue.sort_by);
                  });
              } else {
                throw new Error(
                  '"sort_by" value has to be one of ["manual","best-selling","title-ascending","title-descending","price-ascending","price-descending","created-ascending","created-descending"]'
                );
              }
            }
            break;
          case "products":
            if (
              typeof window[themeName].onCollectionProductsChanged ===
              "function"
            ) {
              window[themeName].onCollectionProductsChanged(
                newValue.products,
                newValue.page,
                newValue.view_type
              );
            } else {
              if (newValue.products instanceof Array) {
                document
                  .querySelectorAll(
                    `[${window["themeName"]}-collection-products-list]`
                  )
                  .forEach((el) => {
                    el.setAttribute("products_handles", newValue.products);
                    el.setAttribute("current_page", newValue.page);
                    el.setAttribute("view_type", newValue.view_type);
                  });
              } else {
                throw new Error('"products" value has to be an array');
              }
            }
            break;
          case "view_type":
            if (typeof window[themeName].onViewTypeChanged === "function") {
              window[themeName].onViewTypeChanged(newValue.view_type);
            } else {
              if (["list, grid"].includes(newValue.view_type)) {
                document
                  .querySelectorAll(
                    `[${window["themeName"]}-collection-products-list], [${window["themeName"]}-collection-products-item]`
                  )
                  .forEach((el) => {
                    el.setAttribute("view_type", newValue.view_type);
                  });
              } else {
                throw new Error(
                  '"view_type" value has to be one of ["list", "grid"]'
                );
              }
            }
            break;
          default:
            break;
        }
      case "collection_is_updating":
        if (
          typeof window[themeName].onCollectionIsUpdatingChanged === "function"
        ) {
          window[themeName].onCollectionIsUpdatingChanged(newValue);
        } else {
          if (newValue === true) {
            document
              .querySelectorAll(
                `[${window["themeName"]}-collection-tags-filter]`
              )
              .forEach((el) => el.setAttribute("collection_is_updating", ""));
          } else {
            document
              .querySelectorAll(
                `[${window["themeName"]}-atc-form], [${window["themeName"]}-cart-form]`
              )
              .forEach((el) => el.removeAttribute("collection_is_updating"));
          }
        }
        break;
      default:
        break;
    }
  });

  // may not be necessary in the future
  window[window.themeName].store = store;
  window[window.themeName].ajax = apis;

  return { store, apis };
};
