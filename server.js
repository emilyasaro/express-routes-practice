const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_db', {logging: false});

const User = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})
User.beforeSave( user => {
  if (!user.name) {
    user.name =  `${user.email}'s name is ${faker.lorem.firstName(3)}`
  }
})

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await User.create({ name: 'moe', email: 'moe@gmail.com' });
  await User.create({ name: 'ethel', email: 'ethel@gmail.com' });
  await User.create({ name: 'lucy', email: 'lucy@gmail.com' });
}

const init = async () => {
  await db.authenticate(); // will confirm that we're connected to the db
  await syncAndSeed();
  console.log(await User.findAll())
}
init();
