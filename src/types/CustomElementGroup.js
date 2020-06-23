import CustomElementTag from './CustomElementTag';
import { capitalize } from '../helpers';

export default class CustomElementGroup {
  constructor(
    id,
    key,
    initialState,
    actions,
    mutations,
    callback,
    apis,
    transformFns,
    tagDefinitions,
    tagTypes,
    builtinTags,
    shopify
  ) {
    if (new.target === CustomElementGroup) {
      throw new Error('cannot initialize abstract class');
    }
    this.id = id;
    this.key = key;
    this.initialState = initialState;
    this.callback = callback;
    this.actions = {};
    this.mutations = {};
    this.initialState = { ...initialState };
    this.shopify = shopify;
    this.tags = [];
    Object.keys(actions).forEach((actionName) => {
      this.addAction(
        actionName.replace('[id]', capitalize(this.id)),
        actions[actionName](this.id, apis, transformFns, shopify)
      );
    });
    Object.keys(mutations).forEach((mutationName) => {
      this.addMutation(
        mutationName.replace('[id]', capitalize(this.id)),
        mutations[mutationName](this.id)
      );
    });
    Object.keys(tagDefinitions).forEach((type) => {
      const { observedAttributes, hook } = tagTypes[type];
      const builtinTagsByKey = builtinTags[type];
      const tagName = `${id}-${type}`;
      const definition = tagDefinitions[type];
      let tag;
      if (typeof definition === 'function') {
        tag = new CustomElementTag(
          tagName,
          observedAttributes,
          hook(this.id),
          definition
        );
      } else if (
        typeof definition === 'string' &&
        builtinTagsByKey[definition]
      ) {
        tag = new CustomElementTag(
          tagName,
          observedAttributes,
          hook(this.id),
          builtinTagsByKey[definition]
        );
      } else {
        tag = new CustomElementTag(
          tagName,
          observedAttributes,
          hook(this.id),
          builtinTagsByKey.demo
        );
      }
      this.addTag(tag);
    });
  }

  addAction(actionName, actionFunction) {
    this.actions = { ...this.actions, [actionName]: actionFunction };
  }

  addMutation(mutationName, mutationFunction) {
    this.mutations = { ...this.mutations, [mutationName]: mutationFunction };
  }

  addTag(tag) {
    this.tags.push(tag);
  }
}
