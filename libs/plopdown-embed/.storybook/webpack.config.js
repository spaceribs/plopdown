const rootWebpackConfig = require('../../../.storybook/webpack.config');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  config.module.rules.push({
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  });

  return config;
};
