const Model = require('./main')

const { log } = require('../utils')


class Todo extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.title = form.title || ''
        this.completed = form.completed || false
        this.userId = 'userId' in form ? form.userId : userId
        this.removed = form.removed || false
    }

    static add(form, user_id) {
        form.userId = user_id
        Todo.create(form)
    }

    static complete(id, completed) {
        const t = Todo.get(id)
        t.completed = completed
        t.updated_time = Date.now()
        t.save()
        return t
    }

    static uncompleted(id, uncompleted) {
        const t = Todo.get(id)
        t.completed = uncompleted
        t.updated_time = Date.now()
        t.save()
        return t
    }
}


module.exports = Todo