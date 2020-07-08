import CustomElementTag from './CustomElementTag';

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
    shopify,
    helpers
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
    this.tags = [];
    Object.keys(actions).forEach((actionName) => {
      this.addAction(
        actionName.replace('[id]', helpers.capitalize(this.id)),
        actions[actionName](this.id, apis, transformFns, shopify)
      );
    });
    Object.keys(mutations).forEach((mutationName) => {
      this.addMutation(
        mutationName.replace('[id]', helpers.capitalize(this.id)),
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
          hook(this.id, helpers),
          definition
        );
      } else if (
        typeof definition === 'string' &&
        builtinTagsByKey[definition]
      ) {
        tag = new CustomElementTag(
          tagName,
          observedAttributes,
          hook(this.id, helpers),
          builtinTagsByKey[definition]
        );
      } else {
        tag = new CustomElementTag(
          tagName,
          observedAttributes,
          hook(this.id, helpers),
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
