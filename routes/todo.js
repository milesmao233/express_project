const express = require('express')

const Todo = require('../models/todo')
const { log } = require('../utils')
const { currentUser } = require('./main')

const todo = express.Router()

todo.get('/', (request, response) => {
    const u = currentUser(request)
    const todoList = Todo.findAll('userId', u.id)
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

todo.get('/edit/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.get(id)
    const args = {
        todo: t,
    }
    response.render('todo/edit.html', args)
})

todo.post('/update', (request, response) => {
    const form = request.body
    Todo.update(form)
    response.redirect('/todo')
})

todo.get('/complete/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    Todo.complete(id, true)
    response.redirect('/todo')
})

todo.get('/uncompleted/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    Todo.uncompleted(id, false)
    response.redirect('/todo')
})

module.exports = todo