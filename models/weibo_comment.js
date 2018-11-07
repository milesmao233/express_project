const Model = require('./main')
const User = require('./user')

class WeiboComment extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.content = form.content || ''
        this.userId = Number('userId' in form ? form.userId : userId)
        this.weiboId = Number('weiboId' in form ? form.weiboId : -1)
        this.removed = form.removed || false
    }

    user() {
        const u = User.get(this.userId)
        return u
    }

    static add(form, user_id) {
        form.userId = user_id
        WeiboComment.create(form)
    }

    static removeAll(comments, removed) {
        const cs = comments.map(c => {
            c.removed = removed
            c.updated_time = Date.now()
            c.save()
        })

        return cs
    }

}


module.exports = WeiboComment