const { hash } = require("bcryptjs");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async insert({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }

  async alter(user_id,  {name, email, password, old_password} ) {
    const user = await this.userRepository.findByUser(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso.");
    }

    user.name = name ?? user.name; // '??' = nullish operator
    user.email = email ?? user.email;
    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password);

      if (!checkPassword) {
        throw new AppError("Senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    const userUpdated = await this.userRepository.update(
      user.name,
      user.email,
      user.password,
      user_id
    );

    return userUpdated
  }
}

module.exports = UsersService;
