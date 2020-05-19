import odiff from "odiff";
export default class Store {
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
        if (typeof value !== "object") {
          if (value !== oldValue) {
            self.processCallbacks([key], value, oldValue);
          }
        } else {
          if (!odiff.equal(value, oldValue)) {
            const path = odiff(oldValue, value)[0].path;
            self.processCallbacks([key, ...path], value, oldValue);
          } else {
            if (value && value.token && value.items) {
              self.processCallbacks([key], value, oldValue);
            }
          }
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
