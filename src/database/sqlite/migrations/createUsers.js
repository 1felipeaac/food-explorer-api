const createUsers = `
CREATE TABLE IF NOT EXISTS
users (
    id integer not null primary key autoincrement,
    name text not null,
    email text not null,
    password text not null,
    role text check (role in ('admin', 'costumer')) not null default 'costumer',
    created_at datetime default CURRENT_TIMESTAMP,
    updated_at datetime default CURRENT_TIMESTAMP
  );
`
module.exports = createUsers;
// console.log(createUsers)