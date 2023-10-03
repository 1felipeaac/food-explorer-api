const UserRepository = require("../repositories/UsersRepository");
const UserService = require("../services/UsersService");

class UsersController {
  async create(request, response) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para obter um usuário.'
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);

    await userService.insert({
      name: name,
      email: email,
      password: password,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id

    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);

    await userService.alter(user_id, { name, email, password, old_password });

    return response.status(201).json();
  }
}

module.exports = UsersController;
