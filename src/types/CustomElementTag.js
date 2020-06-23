export default class CustomElementTag {
  constructor(tagname, observedAttributes, hook, definition) {
    this.tagname = tagname;
    this.observedAttributes = observedAttributes;
    this.hook = hook;
    this.definition = definition;
  }
}
