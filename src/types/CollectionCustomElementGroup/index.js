import CustomElementGroup from '../CustomElementGroup';
import initialState from './initialState';
import actions from './actions';
import mutations from './mutations';
import tagTypes from './tagTypes';
import callback from './callback';
import builtinTags from './builtinTags';

export default class CollectionCustomElementGroup extends CustomElementGroup {
  constructor(id, tagDefinitions, apis, transformFns, shopify, helpers) {
    super(
      id,
      `${id}Collection`,
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
    );
  }
}
