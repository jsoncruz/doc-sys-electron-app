module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      { alias: { '~': './src', '@assets': './assets', '@components': './src/components' } }
    ]
  ]
}
