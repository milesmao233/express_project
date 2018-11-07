const express = require('express')

const Weibo = require('../models/weibo')
const WeiboComment = require('../models/weibo_comment')
const User = require('../models/user')

const {
    currentUser,
} = require('./main')

const {
    log,
} = require('../utils')

const weibo = express.Router()

weibo.get('/', (request, response) => {
    const weibos = Weibo.all()
    const args = {
        weibos: weibos,
    }
    response.render('weibo/index.html', args)
})

weibo.get('/new', (request, response) => {
    response.render('weibo/new.html')
})

weibo.post('/add', (request, response) => {
    const u = currentUser(request)
    const form = request.body
    Weibo.add(form, u.id)
    response.redirect('/weibo')
})

weibo.get('/delete/:weiboId', (request, response) => {
    const weiboId = Number(request.params.weiboId)
    const w = Weibo.get(weiboId)
    const comments = w.comments()
    Weibo.remove(weiboId, true)
    WeiboComment.removeAll(comments, true)
    response.redirect('/weibo')
})

weibo.get('/edit/:weiboId', (request, response) => {
    const id = Number(request.params.weiboId)
    const w = Weibo.get(id)
    const args = {
        weibo: w,
    }
    response.render('weibo/edit.html', args)
})

weibo.post('/update', (request, response) => {
    const form = request.body
    Weibo.update(form)
    response.redirect('/weibo')
})

module.exports = weibo