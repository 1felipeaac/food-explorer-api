const AppError = require("../utils/AppError");

class UsersValidatedService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async validated (user_id){
    const user = await this.userRepository.findByUser(user_id);

    if(user.length === 0){
        throw new AppError("Unauthorized",401)
    }

    return user;
  }
}

module.exports = UsersValidatedService;
