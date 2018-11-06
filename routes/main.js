const User = require('../models/user')

const { log } = require('../utils')

const currentUser = (request) => {
    const uid = request.session.uid || -1
    const u = User.get(uid)
    if ( u === null) {
        return User.guest()
    } else {
        return u
    }
}

module.exports = {
    currentUser: currentUser,
}