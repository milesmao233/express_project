const express = require('express')

const User = require('../models/user')
const { log } = require('../utils')
const { currentUser } = require('./main')

const index = express.Router()

index.get('/', (request, response) => {
    const userList = User.all()
    const u = currentUser(request)
    const args = {
        users: userList,
        user: u,
    }
    response.render('index/index.html', args)
})

index.get('/login', (request, response) => {
    response.render('index/login.html')
})

index.post('/login', (request, response) => {
    const form = request.body
    if (User.validatedLogin(form)) {
        const u = User.findBy('username', form.username)
        request.session.uid = u.id
        response.redirect('/')
    } else {
        response.redirect('index/login.html', {
            message: '用户名或密码错误'
        })
    }
})

index.get('/register', (request, response) => {
    response.render('index/register.html')
})

index.post('/register', (request, response) => {
    const form = request.body
    const u = User.create(form)
    request.session.uid = u.id
    response.redirect('/')
})

index.get('/logout', (request, response) => {
    request.session = null
    response.redirect('/')
})

module.exports = index
