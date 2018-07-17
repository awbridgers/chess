

module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      })
      config.node = {readline: 'empty', fs: 'empty'}
    return config;
}
