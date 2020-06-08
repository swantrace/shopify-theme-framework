/**
 * @typedef StoreConfig
 * @type {object}
 * @property {Array<function>} actions - triggerable events which can call one or more mutations
 * @property {Array<function>} mutations - functions which can directly update one property of the state
 * @property {object} initialState - the initial state when a store instance is initialised
 */

/**
 * a class to help manage global state
 */
export default class Store {
  /**
   * creates an instance of Store to manage the state of a Shopify webpage
   * @param {StoreConfig} params
   */
  constructor({ actions, mutations, initialState }) {
    this.actions = actions;
    this.mutations = mutations;
    this.status = 'idle';
    this.callbacks = {};
    this.state = new Proxy(initialState || {}, {
      set: (state, key, value) => {
        const oldValue = state[key];
        state[key] = value;
        this.runCallbacks(key, value, oldValue);
        this.status = 'idle';
        return true;
      },
    });
  }

  /**
   * triggers the action identified by the actionKey
   * @param {string} actionKey the key of the action to be triggered
   * @param {*} payload data required by the action
   */
  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] === 'function') {
      this.status = 'action';
      this.actions[actionKey](this, payload);
      return true;
    }
    throw new Error(`Action "${actionKey}" doesn't exist.`);
  }

  /**
   * commits a mutation to the state
   * @param {*} mutationKey the key of the mutation to be commited
   * @param {*} payload data required by the mutation
   */
  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] === 'function') {
      this.status = 'mutation';
      const newState = this.mutations[mutationKey](this.state, payload);
      this.state = Object.assign(this.state, newState);
      return true;
    }
    throw new Error(`Mutation "${mutationKey}" doesn't exist`);
  }

  /**
   * runs all the callback functions registered under the specific key of the state,
   * each callback function will accept k
   * @param {string} key the name of the property which is mutated
   * @param {*} value the value of the property after the last mutation
   * @param {*} oldValue the value of the property before the last mutation
   */
  runCallbacks(key, value, oldValue) {
    this.callbacks[key] = this.callbacks[key] || [];
    this.callbacks[key].forEach((callback) => callback(value, oldValue));
    return true;
  }

  /**
   * registers a callback function under a specific key
   * @param {string} key the name of property which will be observed
   * @param {function} callback the function which will run when the observed property's value is mutated
   */
  subscribe(key, callback) {
    this.callbacks[key] = this.callbacks[key] || [];
    this.callbacks[key].push(callback);
    return true;
  }

  /**
   * unregister one or more callbacks
   * @param {string} [key] the name of property used to search callbacks
   * @param {string} [name] the name of callback function used to search a specific callback
   */
  unsubscribe(key, name) {
    if (arguments.length > 1) {
      this.callbacks[key] = this.callbacks[key].filter(
        (fn) => fn.name !== name
      );
    } else if (arguments.length === 1) {
      this.callbacks[key] = [];
    } else {
      this.callbacks = {};
    }
  }
}
