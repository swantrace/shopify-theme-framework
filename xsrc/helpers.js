const throwIfMissing = (name) => {
  throw new Error("Missing parameter: " + name);
};

const encodedStr = (rawStr) =>
  rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });

const handleize = (str) => {
  str = str.toLowerCase();

  var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];

  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], "");
  }

  str = str.replace(/\W+/g, "-");

  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+\z/, "");
  }

  if (str.charAt(0) == "-") {
    str = str.replace(/\A-+/, "");
  }

  return str;
};

window[window.themeName].helpers = { throwIfMissing, encodedStr, handleize };

export { throwIfMissing, encodedStr, handleize };
