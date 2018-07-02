const { createTable } = require('./mysql')

const users =
  `
    CREATE TABLE IF NOT EXISTS users(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(40) NOT NULL,
      pass VARCHAR(40) NOT NULL,
      phone VARCHAR(13) NOT NULl,
      PRIMARY KEY ( id )
    );
  `

createTable(users)
