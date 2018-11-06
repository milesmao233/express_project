const express = require('express')

const Todo = require('../models/todo')
const { log } = require('../utils')
const { currentUser } = require('./main')

const todo = express.Router()

todo.get('/', (request, response) => {
    const u = currentUser(request)
    const todoList = Todo.findAll('user_id', u.id)
    const args = {
        todos: todoList,
    }
    response.render('todo/index.html', args)
})

todo.post('/add', (request, response) => {
    const u = currentUser(request)
    const form = request.body
    Todo.add(form, u.id)

    response.redirect('/todo')
})

todo.get('/delete/:todoId', (request, response) => {
    // 为什么动态路由的params传过来的Key是 todoId
    log('request.params', request.params)
    const todoId = Number(request.params.todoId)
    Todo.remove(todoId, true)
    response.redirect('/todo')
})

// todo.post()

module.exports = todo