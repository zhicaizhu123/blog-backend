const fs = require('fs')
const path = require('path')

module.exports = app => {
  fs.readdirSync(path.join(__dirname, 'modules')).forEach(file => {
    const route = require(`./modules/${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}
