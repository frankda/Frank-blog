const { getBabelLoader } = require('customize-cra');

module.exports = (config, _env) => {
  const babelLoader = getBabelLoader(config);
  config.module.rules.map((rule) => {
    if (typeof rule.test !== 'undefined' || typeof rule.oneOf === 'undefined') {
      return rule;
    }

    rule.oneOf.unshift({
      test: /\.mdx?$/,
      use: [
        {
          loader: babelLoader.loader,
          options: babelLoader.options,
        },
        'mdx-frontmatter-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [
              [
                // Removes front-matter from Markdown output
                require('remark-frontmatter'),
                { type: 'yaml', marker: '-', fence: '---' },
              ],
            ],
          },
        }
      ],
    });

    return rule;
  });
  return config;
};
