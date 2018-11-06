const Model = require('./main')

const { log } = require('../utils')


class Todo extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.title = form.title || ''
        this.completed = form.completed || false
        this.user_id = 'user_id' in form ? form.user_id : userId
        this.removed = form.removed || false
    }

    static add(form, user_id) {
        form.user_id = user_id
        Todo.create(form)
    }

    static update(form) {
        const id = Number(form.id)
        const t = this.get(id)
        const validNames = [
            'title',
        ]

        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                t[k] = form[k]
            }
        })
        t.updated_time = Date.now()
        t.save()
        return t
    }

    static complete(id, completed) {
        const t = Todo.get(id)
        t.completed = completed
        t.updated_time = Date.now()
        t.save()
        return t
    }
}

const testAdd = () => {
    const form = {
        title: '打人',
    }
    const t = Todo.create(form)
    t.save()
}

const test = () => {

}

if (require.main === module) {
    test()
}

module.exports = Todo