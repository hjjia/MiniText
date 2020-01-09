const { fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = function override(config, env) {
    // ts-plugin-import
     // babel-plugin-import
  config = fixBabelImports('import', {
    libraryName: 'antd',
    //style: 'css',
    style: true, // use less for customized theme
  })(config, env);

  config = addWebpackAlias({
    '@comm': path.resolve(__dirname, 'src', 'common')
  })(config, env);

    config.module.rules[2].oneOf.unshift(
        {
          test: /\.less$/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                // theme vars, also can use theme.js instead of this.
                javascriptEnabled: true,
                modifyVars: { "@brand-primary": "#1DA57A" },
              },
            },
          ]
        }
    );
    return config;
}