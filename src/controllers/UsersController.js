const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepositories");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();

    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.insert({
      name: name,
      email: email,
      password: password,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id

    // console.log(`senha antiga: ${old_password}, senha nova: ${password}`)


    const userRepository = new UserRepository();

    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.alter(user_id, { name, email, password, old_password });

    return response.status(201).json();

    // const userRepository = new UserRepository();
    // if (!user) {
    //   throw new AppError("Usuário não encontrado");
    // }

    // const userWithUpdatedEmail = await userRepository.findByEmail(email);

    // if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    //   throw new AppError("Este email já está em uso.");
    // }

    // user.name = name ?? user.name; // '??' = nullish operator
    // user.email = email ?? user.email;

    // if (password && !old_password) {
    //   throw new AppError(
    //     "Você precisa informar a senha antiga para definir a nova senha"
    //   );
    // }

    // if (password && old_password) {
    //   const checkPassword = await compare(old_password, user.password);

    //   if (!checkPassword) {
    //     throw new AppError("Senha antiga não confere.");
    //   }

    //   user.password = await hash(password, 8);

    //   userRepository.update(user.name, user.email, user.password, user_id);

    //   return response.status(200).json();
    // }
  }
}

module.exports = UsersController;
