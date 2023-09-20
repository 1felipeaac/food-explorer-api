const sqliteConnection = require("../database/sqlite");

class UsersRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM  users WHERE email = (?)", [
      email,
    ]);
    return user;
  }
  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return { id: userId };
  }
  async findByUser(user_id) {
    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    return user;
  }

  async update(name, email, password, id) {
    // console.log("cheguei no update do UserRepositories.js");
    const database = await sqliteConnection();
    const user_id = await database.run(
      `
            UPDATE users SET
            name = (?),
            email = (?),
            password = (?),
            updated_at = DATETIME('now')
            WHERE id = (?)`,
      [name, email, password, id]
    );

    return user_id;

  }
}

module.exports = UsersRepository;
