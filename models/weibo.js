const Model = require('./main')
const User = require('./user')
const WeiboComment = require('./weibo_comment')

const { log } = require('../utils')

class Weibo extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.content = form.content || ''
        this.userId = Number('userId' in form ? form.userId : userId)
        this.removed = form.removed || false
    }

    static add(form, user_id) {
        form.userId = user_id
        Weibo.create(form)
    }

    user() {
        const u = User.get(this.userId)
        return u
    }

    comments() {
        return WeiboComment.findAll('weiboId', this.id)
    }
}

module.exports = Weibo