const throwIfMissing = function (name) {
  throw new Error("Missing parameter: " + name);
};

const encodedStr = (rawStr) =>
  rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });

export { throwIfMissing, encodedStr };
