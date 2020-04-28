import ajaxAPIsCreator from "./ajax";
import isEqual from "lodash.isequal";
import { encodedStr } from "./helpers";

window[window.themeName] = window[window.themeName] || {};
window[window.themeName].ajax = window[window.themeName].ajax || {};
window[window.themeName].store = window[window.themeName].store || {};

class Store {
  constructor(params) {
    const self = this;
    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";
    self.callbacks = [];
    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy(params.initialState || {}, {
      set: function (state, key, value) {
        const oldValue = state[key];
        state[key] = value;
        if (!isEqual(oldValue, value)) {
          self.processCallbacks(key, value, oldValue);
        }
        self.status = "resting";
        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    const self = this;
    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }
    self.status = "action";
    self.actions[actionKey](self, payload);
    return true;
  }

  commit(mutationKey, payload) {
    const self = this;
    if (typeof self.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }
    self.status = "mutation";
    let newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
    return true;
  }

  processCallbacks(key, value, oldValue) {
    const self = this;
    if (!self.callbacks.length) {
      return false;
    }
    self.callbacks.forEach((callback) => callback(key, value, oldValue));
    return true;
  }

  subscribe(callback) {
    const self = this;
    if (typeof callback !== "function") {
      console.error(
        "You can only subscribe to Store changes with a valid function"
      );
      return false;
    }
    self.callbacks.push(callback);
    return true;
  }
}

export default async () => {
  const apis = await ajaxAPIsCreator();
  window[window.themeName].ajax = apis;

  const initialCart = await apis.getCart();
  const initialProducts = [];
  const initialState = {
    cart: initialCart,
    products: initialProducts,
    cart_is_updating: false,
  };

  const actions = {
    addItems(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .addItem({ data: { items: payload } })
        .then(apis.getCart)
        .then((cart) => {
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        });
    },
    addItemFromForm(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis
        .addItem({ data: new FormData(payload) })
        .then(apis.getCart)
        .then((cart) => {
          context.commit("setCart", cart);
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
        .then(apis.getCart)
        .then((cart) => {
          context.commit("setCart", cart);
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
          context.commit("setCart", cart);
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
          context.commit("setCart", cart);
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
          context.commit("setCart", cart);
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
          context.commit("setCart", cart);
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
          context.commit("setCart", cart);
          context.commit("setCartIsUpdating", false);
        });
    },
    clearCart(context, payload) {
      context.commit("setCartIsUpdating", true);
      apis.clearCart().then((cart) => {
        context.commit("setCart", cart);
        context.commit("setCartIsUpdating", false);
      });
    },
  };

  const mutations = {
    setCart(state, payload) {
      state.cart = payload;
      return state;
    },
    setCartIsUpdating(state, payload) {
      state.cart_is_updating = payload;
      return state;
    },
    setProducts(state, payload) {
      state.products = products;
      return state;
    },
  };

  const storeInstance = new Store({
    actions,
    mutations,
    initialState,
  });

  storeInstance.subscribe(function (key, newValue, oldValue) {
    switch (key) {
      case "cart_is_updating":
        if (typeof window[themeName].cartChangerDisableFn === "function") {
          window[themeName].cartChangerDisableFn();
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
        document
          .querySelectorAll(`[${window["themeName"]}-cart-form]`)
          .forEach((el) => {
            el.setAttribute(
              "old_cart_json",
              encodedStr(JSON.stringify(oldValue))
            );
            el.setAttribute("cart_json", encodedStr(JSON.stringify(newValue)));
          });
        break;
      default:
        break;
    }
  });

  window[window.themeName].store = storeInstance;
  return storeInstance;
};
