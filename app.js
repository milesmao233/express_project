const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const path = require('path')


const { log } = require('./utils')
const { secretKey } = require('./config')

const index = require('./routes/index')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(session({
    secret: secretKey,
}))

nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})

const asset = path.join(__dirname, 'public')
app.use('/static', express.static(asset))

app.use('/', index)

const run = (port=3000, host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        log(`listening server at http://${address.address}:${address.port}`)
    })
}


if (require.main === module) {
    const port = 5000
    // host 参数指定为 '0.0.0.0' 可以让别的机器访问你的代码
    // const host = '0.0.0.0'
    const host = '127.0.0.1'
    run(port, host)
}

