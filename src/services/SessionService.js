const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const {sign} = require("jsonwebtoken")

class SessionService{
    constructor(sessionRepository){
        this.sessionRepository = sessionRepository;
    }

    async insert({email, password}){
        const user = await this.sessionRepository.checkEmail(email);
        

        if(!user){
            throw new AppError("Email e/ou senha incorretos", 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Email e/ou senha incorretos", 401)
        }

        const {secret, expiresIn} = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return {user, token}
    }
}

module.exports = SessionService