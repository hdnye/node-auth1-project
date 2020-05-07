
//sessions to ad user athyzn after athentication
const sessions = {};

function validateUser() {
    const authError = {
        message: 'Invalid Credentials'
    }

    return async (req, res, next) => {
        try {
            if(!req.session || !req.session.user) {
                res.status(401).json(authError)
            }
            next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = {
    sessions,
    validateUser
}