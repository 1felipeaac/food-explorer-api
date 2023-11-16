const UserRepository = require("../repositories/UsersRepository");
const UsersValidatedService = require("../services/UsersValidatedServices");

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;

    // console.log(user)

    const userRepository = new UserRepository();

    const usersValidatedService = new UsersValidatedService(userRepository);

    await usersValidatedService.validated(user.id)
    
    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;
