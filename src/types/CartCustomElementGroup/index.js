import CustomElementGroup from '../CustomElementGroup';

export default class CartCustomElementGroup extends CustomElementGroup {
  constructor(id) {
    super();
    this.id = id;
    this.actions = {};
    this.mutations = {};
    this.initialState = {};
    this.tags = [];
  }
}
