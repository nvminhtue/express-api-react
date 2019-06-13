module.exports = {
  "development": {
    "username": "express-mvp-dbuser",
    "password": 'ASDasd123',
    "database": "express-mvp-db",
    "host": "localhost",
    "dialect": "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
