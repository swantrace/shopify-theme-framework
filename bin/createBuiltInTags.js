/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [nodePlace, scriptPath, folderName, ...fileNames] = process.argv;
fileNames.forEach((fileName) => {
  fs.writeFile(
    `${path.resolve(
      __dirname,
      `../src/types/${folderName}/builtinTags/${fileName}.js`
    )}`,
    `/* eslint-disable no-unused-vars */
  export default {
    demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
      const { html } = helpers;
      return html\`\`;
    },
    'default-main': ({ helpers, hook, settings, locales, shopify }) => (
      element
    ) => {
      const { html } = helpers;
      return html\`${fileName}\`;
    },
  };`,
    function callback(err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );
});
