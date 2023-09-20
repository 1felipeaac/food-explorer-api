const SessionRepository = require("../repositories/SessionsRepository");
const SessionService = require("../services/SessionService");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;
    const sessionRepository = new SessionRepository()
    const sessionService = new SessionService(sessionRepository)
    
    const token = await sessionService.insert({email, password})
    
    return response.status(200).json(token);
  }
}

module.exports = SessionsController;
