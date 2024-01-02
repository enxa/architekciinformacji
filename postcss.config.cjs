const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')
const postcssEasings = require('postcss-easings')

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
      }
    }),
    autoprefixer({}),
    postcssEasings()
  ],
}