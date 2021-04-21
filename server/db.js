const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/playlist-gen', {
  logging: false
});

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING
  },
})

module.exports = {
  db,
  User
};
