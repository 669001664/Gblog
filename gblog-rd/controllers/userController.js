const model = require('../models/userModel')

module.exports = {
    async login(ctx) {
        let { username, password } = ctx.request.body
        let results = await model.getUserByNameAndPwd(username, password);
        if (results.length > 0) {
            let payload = {
                userId: results[0].user_id,
                username
            }
            ctx.body = {
                status: 'success',
                payload
            }
        } else {
            ctx.body = {
                status: 'fail',
            }
        }
    }
}
