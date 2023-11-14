const SessionRepository = require("../repositories/SessionsRepository");
const SessionService = require("../services/SessionService");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;
    const sessionRepository = new SessionRepository()
    const sessionService = new SessionService(sessionRepository)
    
    const user = await sessionService.insert({email, password, response})
    
    return response.status(201).json({user});
  }
}

module.exports = SessionsController;
