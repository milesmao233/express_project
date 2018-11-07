const express = require('express')

const User = require('../models/user')
const WeiboComment = require('../models/weibo_comment')


const {
    currentUser,
} = require('./main')

const {
    log,
} = require('../utils')

const weibo_comment = express.Router()

weibo_comment.post('/add', (request, response) => {
    const u = currentUser(request)
    const form = request.body
    WeiboComment.add(form, u.id)
    response.redirect('/weibo')
})

weibo_comment.get('/delete/:weiboCommentId', (request, response) => {
    const id = Number(request.params.weiboCommentId)
    WeiboComment.remove(id, true)
    response.redirect('/weibo')
})

weibo_comment.get('/edit/:weiboCommentId', (request, response) => {
    const id = Number(request.params.weiboCommentId)
    const c = WeiboComment.get(id)
    const args = {
        comment: c,
    }
    response.render('weibo_comment/edit.html', args)
})

weibo_comment.post('/update', (request, response) => {
    const form = request.body
    WeiboComment.update(form)
    response.redirect('/weibo')
})


module.exports = weibo_comment