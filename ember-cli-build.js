'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin()],
    },
    // Add options here
  });

  return app.toTree();
};
