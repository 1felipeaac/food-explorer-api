const sqlConnection = require("../../sqlite")

const usersCreate = require("./createUsers")

async function migrationsRun(){
    const schemas = [
      usersCreate
      ].join('');
    
      sqlConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error));

}

module.exports = migrationsRun