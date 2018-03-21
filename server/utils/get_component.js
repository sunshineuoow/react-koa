const {createElement} = require('react')
const {renderToString} = require('react-dom/server')

const getComponent = (name) => {
  const path = `../../static/webpack/server/${name}/index`
  return renderToString(createElement(require(path).default))
}

module.exports = getComponent
