const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");
const { response } = require("express");

class SessionService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async insert({ email, password, response }) {
    const user = await this.sessionRepository.checkEmail(email);

    if (!user) {
      throw new AppError("Email e/ou senha incorretos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email e/ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    delete user.password;

    return user;
  }
}

module.exports = SessionService;
