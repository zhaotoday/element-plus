const PORT = 84
const SRC = 'src'
const DIST = 'dist'
const ENTRY = 'src/entry.js'
const TEMPLATE = 'src/templates/index.html'
const TITLE = 'react webapp'
const CDN = '/dist/'
const ENV = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

module.exports = {
  PORT,
  SRC,
  DIST,
  ENTRY,
  TEMPLATE,
  TITLE,
  CDN,
  ENV
}
