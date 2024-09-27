import ApiError from "../utils/ApiError.js";

const greaterThan6 = (str) => {
    return str.length >= 6
}

const loginValidation = async(req, res, next) => {
    try{
        const {username, password} = req.body;
        if (!greaterThan6(username) || !greaterThan6(password))
            throw new ApiError(400, 'Username or password at least 6 characters')
        next()
    }
    catch(err) {
        next(err)
    }
}

const registerValidation = async(req, res, next) => {
    try{
        const {username, password, email, roleId} = req.body;
        if (email.indexOf('@gmail.com') == -1)
            throw new ApiError(400, 'Email must be example@gmail.com')
        if (!greaterThan6(username) || !greaterThan6(password))
            throw new ApiError(400, 'Username or password at least 6 characters')
        next()
    }
    catch(err) {
        next(err)
    }
}
export default {loginValidation, registerValidation}